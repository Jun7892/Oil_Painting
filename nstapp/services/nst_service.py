from ninja.files import UploadedFile
from ninja import File
import tensorflow as tf
import numpy as np
from nstapp.apps import NstappConfig
from io import BytesIO
from PIL import Image

# 구조가 너무 복잡해지면 이해가 어려울 것 같아 이렇게 두었는데, 전처리 관련 함수는 utils 폴더 등에 새로운 파일로 만들어서 보관해놓고 service에서는 import 해와서 쓰는 것이 조금 더 깔끔한 구조
def upload_tensor_img(bucket, tensor, key):
    # normalize 해제
    tensor = np.array(tensor * 255, dtype=np.uint8)
    # image 화
    image = Image.fromarray(tensor[0])
    # 메모리에다가 이미지를 파일 형태로 저장
    buffer = BytesIO()
    image.save(buffer, 'PNG')
    buffer.seek(0)  # 0번째 포인터위치부터 파일을 읽으라는 뜻
    # s3 에다가 업로드
    NstappConfig.s3.put_object(Bucket=bucket, Key=key, Body=buffer, ACL='public-read')
    # s3 에 올라간 파일의 링크를 리턴함
    location = NstappConfig.s3.get_bucket_location(Bucket=bucket)['LocationConstraint']
    url = "https://s3-%s.amazonaws.com/%s/%s" % (location, bucket, key)
    return url

# 구조가 너무 복잡해지면 이해가 어려울 것 같아 이렇게 두었는데, 전처리 관련 함수는 utils 폴더 등에 새로운 파일로 만들어서 보관해놓고 service에서는 import 해와서 쓰는 것이 조금 더 깔끔한 구조
def load_style(path_to_style, max_dim):
    # 이미지의 최대 크기 제한
    img = tf.io.read_file(path_to_style)
    img = tf.image.decode_image(img, channels=3)
    img = tf.image.convert_image_dtype(img, tf.float32)

    # 이미지의 채널 부분 제외하고, 이미지의 가로/세로 shape 를 추출함
    shape = tf.cast(tf.shape(img)[:-1], tf.float32)
    # 이미지의 가로/세로 중에서 긴 부분의 길이를 추출함
    long_dim = max(shape)
    # 이미지의 최대 크기를 제한하기 위해서, 제한하고자 하는 길이 / 긴 부분의 길이를 구함
    scale = max_dim / long_dim

    # 이미지의 가로/세로 길이 * (제한하고자 하는 길이 / 긴 부분의 길이) 해서 축소될 길이(shape)를 구함
    new_shape = tf.cast(shape * scale, tf.int32)
    # 축소될 길이를 구했으니 해당 길이대로 resize 함
    img = tf.image.resize(img, new_shape)
    # batch dimension 추가
    img = img[tf.newaxis, :]
    return img


def nst_apply(key: str, img: UploadedFile = File(...)) -> str:
    style_path = tf.keras.utils.get_file('kandinsky5.jpg',
                                         'https://storage.googleapis.com/download.tensorflow.org/example_images/Vassily_Kandinsky%2C_1913_-_Composition_7.jpg')

    # 이미지 읽기
    img = Image.open(img.file).convert('RGB')
    content_image = tf.keras.preprocessing.image.img_to_array(img)
    # 스타일도 위처럼 읽어와도 되지만, 스타일은 비율이 유지되어야만 올바르게 적용됨
    # 스타일 비율도 일괄적으로 resizing 할 경우 결과가 이상할 수 있음에 유의
    # load_style 함수는 비율을 유지하면서 스타일 이미지 크기를 줄이는 함수
    style_image = load_style(style_path, 512)

    # float32 타입으로 바꾸고, newaxis 를 통해 배치 차원을 추가한 후에 255 로 나눠서 normalize 함
    # 이후 256, 256 으로 리사이즈
    content_image = content_image.astype(np.float32)[np.newaxis, ...] / 255.
    content_image = tf.image.resize(content_image, (256, 256))

    stylized_image = NstappConfig.hub_module(tf.constant(content_image), tf.constant(style_image))[0]
    image_url = upload_tensor_img('(버킷명)', stylized_image, key)
    return image_url