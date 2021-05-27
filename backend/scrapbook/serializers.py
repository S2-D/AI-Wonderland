from rest_framework import serializers
from .models import Scrapbook

class ScrapbookSerializer(serializers.ModelSerializer):
    
    def create(self, validated_data):
        scrap_item = Scrapbook.objects.create (
            mem_id = validated_data['mem_id'],
            p_no   = validated_data['p_no'],
        )
        scrap_item.save()
        return scrap_item
    
    class Meta:
        model = Scrapbook
        fields = ('mem_id', 'p_no')
