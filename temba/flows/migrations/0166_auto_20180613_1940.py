# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-06-13 19:40
from __future__ import unicode_literals

from django.db import migrations


def apply_manual():
    from temba.flows.models import ActionLog

    ActionLog.objects.filter(run__contact__is_test=False).delete()


def apply_as_migration(apps, schema_editor):
    ActionLog = apps.get_model("flows", "ActionLog")
    ActionLog.objects.filter(run__contact__is_test=False).delete()


def clear_migration(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [("flows", "0165_auto_20180615_2040")]

    operations = [migrations.RunPython(apply_as_migration, clear_migration)]
