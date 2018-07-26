# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-07-16 18:19
from __future__ import unicode_literals

from django.db import migrations

SQL = """
CREATE TRIGGER temba_flowrun_update_flowstartcount
   AFTER INSERT OR DELETE OR UPDATE OF start_id
   ON flows_flowrun
   FOR EACH ROW
   EXECUTE PROCEDURE temba_update_flowstartcount();
"""


class Migration(migrations.Migration):

    dependencies = [("flows", "0169_procs")]

    operations = [migrations.RunSQL(SQL)]
