# Generated by Django 3.1.7 on 2021-04-12 00:12

from django.db import migrations
import django.db.models.expressions


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0005_auto_20210411_2008'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='task',
            options={'ordering': ['user', django.db.models.expressions.OrderBy(django.db.models.expressions.F('order'), nulls_last=True)]},
        ),
    ]