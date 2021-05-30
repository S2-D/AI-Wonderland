from rest_framework import serializers
from .models import Timegram, Like


class TimegramCreateSerializer(serializers.Serializer):
    title = serializers.CharField(required=True)
    p_no1 = serializers.CharField(required=True)
    p_no2 = serializers.CharField(required=True)
    p_no3 = serializers.CharField(required=True)
    p_no4 = serializers.CharField(required=True)
    p_no5 = serializers.CharField(required=True)
    p_no6 = serializers.CharField(required=True)
    total_price = serializers.CharField(required=True)
    mem = serializers.CharField(required=True)

    def create(self, validated_data):
        print(validated_data)
        timegram_item = Timegram.objects.create(
            title=validated_data['title'],
            p_no1=validated_data['p_no1'],
            p_no2=validated_data['p_no2'],
            p_no3=validated_data['p_no4'],
            p_no4=validated_data['p_no4'],
            p_no5=validated_data['p_no5'],
            p_no6=validated_data['p_no6'],
            mem_id=validated_data['mem']
        )
        timegram_item.save()
        return timegram_item

    class Meta:
        model = Timegram
        fields = '__all__'


class TimegramListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timegram
        fields = '__all__'
        depth = 2


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timegram
        fields = '__all__'


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
            return like_item

    class Meta:
        model = Like
        fields = '__all__'