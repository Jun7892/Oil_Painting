from ninja import Schema

# file_url 은 s3 에 올라간 파일 url 을 말합니다!
class NstResponse(Schema):
    file_url: str