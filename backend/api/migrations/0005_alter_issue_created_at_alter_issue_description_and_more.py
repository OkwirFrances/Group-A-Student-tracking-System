# Generated by Django 5.2 on 2025-04-16 21:05

import datetime
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_issue_created_at_alter_issue_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='issue',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
        migrations.AlterField(
            model_name='issue',
            name='description',
            field=models.TextField(blank=True, null=True, validators=[django.core.validators.MaxLengthValidator(500)]),
        ),
        migrations.AlterField(
            model_name='issue',
            name='status',
            field=models.CharField(choices=[('open', 'Open'), ('assigned', 'Assigned'), ('in_progress', 'In Progress'), ('resolved', 'Resolved')], default='open', max_length=20),
        ),
    ]
