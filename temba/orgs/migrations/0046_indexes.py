# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-07-16 17:06
from __future__ import unicode_literals

from django.db import migrations

SQL = """
CREATE INDEX orgs_topupcredits_unsquashed
ON orgs_topupcredits(topup_id) WHERE NOT is_squashed;
"""


class Migration(migrations.Migration):

    dependencies = [("orgs", "0045_initial")]

    operations = []
