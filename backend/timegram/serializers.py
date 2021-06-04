from rest_framework import serializers
from .models import Timegram, Like
from member.models import User
from scrapbook.models import Scrapbook


class TimegramCreateSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        p_no1 = validated_data['p_no1']
        p_no2 = validated_data['p_no2']
        p_no3 = validated_data['p_no3']
        p_no4 = validated_data['p_no4']
        p_no5 = validated_data['p_no5']
        p_no6 = validated_data['p_no6']
        total_price = validated_data['total_price']
        mem_id = validated_data['mem'].id

        timegram_item = Timegram.objects.create(
            title=validated_data['title'],
            p_no1=p_no1,
            p_no2=p_no2,
            p_no3=p_no3,
            p_no4=p_no4,
            p_no5=p_no5,
            p_no6=p_no6,
            total_price=total_price,
            mem_id=mem_id
        )

        timegram_item.save()

        # 타임그램 등록시 사용자 머니 차감
        user = User.objects.filter(id=mem_id)
        current_money = int(user[0].money) - int(total_price)

        user.update(money=current_money)

        # 스크랩북 삭제
        scrap_list = [p_no1, p_no2, p_no3, p_no4, p_no5, p_no6]

        for i in range(len(scrap_list)):
            if scrap_list[i] != '':
                scrapbook = Scrapbook.objects.filter(
                    mem_id_id=mem_id, p_no_id=scrap_list[i])
                scrapbook.delete()

        return timegram_item

    class Meta:
        model = Timegram
        fields = '__all__'


class TimegramListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timegram
        fields = '__all__'
        depth = 1


class LikeCreateSerializer(serializers.Serializer):
    mem = serializers.CharField(required=True)
    timegram = serializers.CharField(required=True)

    def create(self, validated_data):
        like_list = Like.objects.filter(
            mem_id=validated_data['mem'], timegram_id=validated_data['timegram'])

        # update
        if len(like_list) > 0:
            if like_list[0].flag:
                flag = False
            else:
                flag = True

            like_item = Like.objects.filter(
                mem_id=validated_data['mem'], timegram_id=validated_data['timegram']).update(flag=flag)

            return like_item

        # create
        else:
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