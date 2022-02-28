from django.http import HttpResponse
from django.shortcuts import render

import tensorflow_hub as hub
import tensorflow as tf
import numpy as np

import os
from collections import Counter
import pandas as pd
import json

# Create your views here.
from pasta.base.annotate import module
from sklearn.metrics.pairwise import cosine_similarity

def main_view(request):
    return render(request, 'testmain.html')

def send_similarity(request):
    select = json.loads(request.body.decode('utf-8'))
    print(select)
    print(select['select'])
    result = img_similarity(select['select'])
    context = {'result' : result}
    return HttpResponse(json.dumps(context), content_type="application/json")

def img_similarity(select):
    # pretrained model 을 통해 feature vector 를 제공해주고 있는 api 를 불러온다!
    module = hub.load("https://tfhub.dev/google/tf2-preview/mobilenet_v2/feature_vector/4")
    print(os.getcwd())
    path = "./static/oilpaintImg"
    # 해당 경로에 있는 모든 파일을 가지고 온다
    file_list = os.listdir(path)

    # 해당 경로에 있는 모든 파일 중, .png 혹은 .jpeg 파일만 가지고 온다
    file_list_img = [file for file in file_list if file.endswith(".png") or file.endswith(".jpg")]
    print(file_list_img)

# 빈 데이터프레임을 하나 만들고,
    df = pd.DataFrame()

# enumerate 를 써서, 파일마다 인덱스를 부여하면서 For문을 돌린다
    for i, img in enumerate(file_list_img):
        # pretrained model 의 input 에 맞춰서, 224 x 224 로 사이즈를 맞춰주면서 이미지를 불러온다
        image = tf.keras.preprocessing.image.load_img(img, target_size=(224, 224), color_mode="rgb")
        # 이미지를 numpy array 로 변환하고,
        input_arr = tf.keras.preprocessing.image.img_to_array(image)
        # batch 형태로 만들어주기 위해서 [] 로 한번 감싸준다 (이제 모델 학습에 바로 넣을 수 있는 이미지 형태가 된 것)
        input_arr = np.array([input_arr])
        # 이후 해당 input_arr 변수를 가장 위에서 불러왔던 모델을 통과시켜서 feature vector 를 추출한다
        output_arr = np.array(module(input_arr))
        # 파일 이름과 feature vector 를 한줄씩 데이터프레임에 추가한다
        df = df.append({'filename': img, 'output_arr': output_arr}, ignore_index=True)

    similarity = []

    for i in select:
        print(i+'.jpg')
        index = file_list_img.index(i+'.jpg')
        print(index)
        dic = {}
        for j in range(len(file_list_img)):
            b = cosine_similarity(df['output_arr'][index], df['output_arr'][j])
            dic[file_list_img[j]] = int(b * 100)
        similarity.append(dic)

    print(similarity)



    first_basket_fruit_count = Counter(similarity[0])
    second_basket_fruit_count = Counter(similarity[1])
    total_fruit_count = first_basket_fruit_count + second_basket_fruit_count
    print(dict(total_fruit_count))

    dictionary = dict(total_fruit_count)
    total = sorted(dictionary.items(), key=lambda x: x[1], reverse=True)

    return(total)
