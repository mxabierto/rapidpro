# -*- coding: utf-8 -*-
# Generated by Django 1.11.14 on 2018-10-29 20:59
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('orgs', '0045_auto_20181029_2059'),
        ('flows', '0166_auto_20180613_1940'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_active', models.BooleanField(default=True, help_text='Whether this item is active, use this instead of deleting')),
                ('created_on', models.DateTimeField(blank=True, default=django.utils.timezone.now, editable=False, help_text='When this item was originally created')),
                ('modified_on', models.DateTimeField(blank=True, default=django.utils.timezone.now, editable=False, help_text='When this item was last modified')),
                ('note_orig', models.CharField(blank=True, help_text='Notes of notification to admin', max_length=250, null=True, verbose_name='Note origin')),
                ('note_dest', models.CharField(blank=True, help_text='Notes of notification to user', max_length=250, null=True, verbose_name='Note dest')),
                ('item_id', models.IntegerField(default=0, help_text='Id of item')),
                ('item_type', models.CharField(choices=[('C', 'Campaign_type'), ('F', 'Flow_type'), ('T', 'Trigger_type')], help_text='Type of item', max_length=1, null=True)),
                ('item_name', models.CharField(blank=True, help_text='Name of item', max_length=200, null=True, verbose_name='Name of item')),
                ('accepted', models.BooleanField(default=False, help_text='Whether this notification was accepted by administrator')),
                ('auto_migrated', models.BooleanField(default=False, help_text='Whether the notification is auto_migrated')),
                ('read', models.BooleanField(default=False, help_text='Whether the notification was read by user')),
                ('migrated', models.BooleanField(default=False, help_text='Whether the notification was migrated')),
                ('archived', models.BooleanField(default=False, help_text='Whether the flow most to be archived')),
                ('history_dump', models.CharField(blank=True, help_text='History of changes', max_length=2000, null=True, verbose_name='History of changes')),
                ('is_automigrated', models.BooleanField(default=False, help_text='Whether the notification was migrated')),
                ('created_by', models.ForeignKey(help_text='The user which originally created this item', on_delete=django.db.models.deletion.PROTECT, related_name='notifications_notification_creations', to=settings.AUTH_USER_MODEL)),
                ('history', models.ForeignKey(blank=True, help_text='Snapshot of the flow edition', null=True, on_delete=django.db.models.deletion.SET_NULL, to='flows.FlowRevision', verbose_name='FlowRevision')),
                ('modified_by', models.ForeignKey(help_text='The user which last modified this item', on_delete=django.db.models.deletion.PROTECT, related_name='notifications_notification_modifications', to=settings.AUTH_USER_MODEL)),
                ('org_dest', models.ForeignKey(help_text='The destination organization', on_delete=django.db.models.deletion.CASCADE, related_name='org_dest', to='orgs.Org', verbose_name='Org_destine')),
                ('org_orig', models.ForeignKey(blank=True, help_text='The origin organization', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='org_origin', to='orgs.Org', verbose_name='Org_origin')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]