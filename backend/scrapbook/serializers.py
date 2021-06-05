from rest_framework import serializers
from .models import Scrapbook
from products.serializers import ProductSerializer

class ScrapbookSerializer(serializers.ModelSerializer):
    p_no = ProductSerializer(read_only=True)

    class Meta:
        model = Scrapbook
        # fields = ('mem_id', 'p_no')
        fields = '__all__'

class ScrapbookCRUDSerializer(serializers.ModelSerializer):
    
    def create(self, validated_data):
        scrap_item = Scrapbook.objects.create (
            mem_id = validated_data['mem_id'],
            p_no   = validated_data['p_no'],
        )
        
        return scrap_item

    class Meta:
        model = Scrapbook
        fields = ('mem_id', 'p_no')
        # fields = '__all__'
