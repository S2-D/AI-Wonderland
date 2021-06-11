from rest_framework import serializers
from .models import Timegram, Like
from member.models import User
from scrapbook.models import Scrapbook
from products.models import Product
from member.models import User


class TimegramCreateSerializer(serializers.Serializer):
    p_no1_id = serializers.CharField(allow_blank=True, allow_null=True)
    p_no2_id = serializers.CharField(allow_blank=True, allow_null=True)
    p_no3_id = serializers.CharField(allow_blank=True, allow_null=True)
    p_no4_id = serializers.CharField(allow_blank=True, allow_null=True)
    p_no5_id = serializers.CharField(allow_blank=True, allow_null=True)
    p_no6_id = serializers.CharField(allow_blank=True, allow_null=True)
    title = serializers.CharField()
    total_price = serializers.FloatField()
    mem_id = serializers.IntegerField()

    def create(self, validated_data):
        total_price = validated_data['total_price']
        mem_id = validated_data['mem_id']

        timegram_item = Timegram.objects.create(**validated_data)
        timegram_item.save()

        # 타임그램 등록시 사용자 머니 차감
        user = User.objects.filter(id=mem_id)
        current_money = int(user[0].money) - int(total_price)

        user.update(money=current_money)

        # 스크랩북 삭제
        scrap_list = [validated_data['p_no1_id'], validated_data['p_no2_id'], validated_data['p_no3_id'],
                      validated_data['p_no4_id'], validated_data['p_no5_id'], validated_data['p_no6_id']]

        for i in range(len(scrap_list)):
            if scrap_list[i] != '':
                scrapbook = Scrapbook.objects.filter(
                    mem_id_id=mem_id, p_no_id=scrap_list[i])
                scrapbook.delete()

        return timegram_item

    class Meta:
        model = Timegram
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class TimegramListSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    p_no1 = ProductSerializer()
    p_no2 = ProductSerializer()
    p_no3 = ProductSerializer()
    p_no4 = ProductSerializer()
    p_no5 = ProductSerializer()
    p_no6 = ProductSerializer()
    flag = serializers.BooleanField()
    mem = UserSerializer()
    title = serializers.CharField()
    total_like = serializers.IntegerField()
    total_price = serializers.FloatField()
    dt_modified = serializers.DateTimeField()
    dt_created = serializers.DateTimeField()


class MyLookbookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timegram
        fields = '__all__'


class LikeCreateSerializer(serializers.Serializer):
    mem = serializers.CharField()
    timegram = serializers.CharField(required=True)

    def create(self, validated_data):
        like_list = Like.objects.filter(
            mem_id=validated_data['mem'], timegram_id=validated_data['timegram'])

        timegram_like = Timegram.objects.filter(id=validated_data['timegram'])

        # update
        if len(like_list) > 0:
            if like_list[0].flag:
                timegram_like.update(total_like=int(
                    timegram_like[0].total_like) - 1)
                flag = False
            else:
                timegram_like.update(total_like=int(
                    timegram_like[0].total_like) + 1)
                flag = True

            like_item = Like.objects.filter(
                mem_id=validated_data['mem'], timegram_id=validated_data['timegram']).update(flag=flag)

            return like_item

        # create
        else:
            timegram_like.update(total_like=int(
                timegram_like[0].total_like) + 1)

            like_item = Like.objects.create(
                mem_id=validated_data['mem'],
                timegram_id=validated_data['timegram'],
            )
            like_item.save()

            # 타임그램의 작성자 조회
            timegram = Timegram.objects.filter(id=validated_data['timegram'])

            # 본인이 본인 게시물에 좋아요를 누른 경우
            if str(validated_data['mem']) == str(timegram[0].mem_id):
                pass
            else:
                user = User.objects.filter(id=timegram[0].mem_id)
                user.update(money=user[0].money+100)

            return like_item

    class Meta:
        model = Like
        fields = '__all__'