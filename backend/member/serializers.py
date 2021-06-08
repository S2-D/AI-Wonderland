from rest_framework import serializers, status
from rest_framework_jwt.settings import api_settings

from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login

from .models import User
import re

JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER

class UserMoneySerializer(serializers.ModelSerializer):
    class Meta :
        model = User
        fields = ['money']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['nickname', 'money']


class UserCreateSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    nickname = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    def create(self, validated_data):

        email = validated_data['email']
        password = validated_data['password']

        if not re.findall('^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d$@$!%*#?&]{8,}$', password):
            raise serializers.ValidationError(
                {
                    "status_code": status.HTTP_400_BAD_REQUEST,
                    "status": "error",
                    "message": "비밀번호는 영문, 숫자, 특수문자를 사용하여 8자리 이상으로 조합해주세요."
                }
            )


        user = User.objects.create(
            email=email,
            nickname=validated_data['nickname'],
        )

        user.set_password(password)

        user.save()
        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=64)
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        email = data.get("email", None)
        password = data.get("password", None)
        user = authenticate(email=email, password=password)

        if user is None:
            return {
                'email': 'None'
            }
        try:
            payload = JWT_PAYLOAD_HANDLER(user)
            jwt_token = JWT_ENCODE_HANDLER(payload)
            update_last_login(None, user)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                'User with given email and password does not exists'
            )
        return {
            'email': user.email,
            'token': jwt_token
        }