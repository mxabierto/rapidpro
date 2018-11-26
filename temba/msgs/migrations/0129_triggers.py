# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-07-16 18:20
from __future__ import unicode_literals

from django.db import migrations

SQL = """
CREATE TRIGGER temba_broadcast_on_change_trg
  AFTER INSERT OR UPDATE OR DELETE ON msgs_broadcast
  FOR EACH ROW EXECUTE PROCEDURE temba_broadcast_on_change();

CREATE TRIGGER temba_msg_labels_on_change_trg
   AFTER INSERT OR DELETE ON msgs_msg_labels
   FOR EACH ROW EXECUTE PROCEDURE temba_msg_labels_on_change();

CREATE TRIGGER temba_msg_on_change_trg
  AFTER INSERT OR UPDATE OR DELETE ON msgs_msg
  FOR EACH ROW EXECUTE PROCEDURE temba_msg_on_change();

CREATE TRIGGER temba_msg_update_channelcount
   AFTER INSERT OR DELETE OR UPDATE OF direction, msg_type, created_on
   ON msgs_msg
   FOR EACH ROW
   EXECUTE PROCEDURE temba_update_channelcount();

CREATE TRIGGER temba_when_msgs_update_then_update_topupcredits
   AFTER INSERT OR DELETE OR UPDATE OF topup_id
   ON msgs_msg
   FOR EACH ROW
   EXECUTE PROCEDURE temba_update_topupcredits();
"""


class Migration(migrations.Migration):

    dependencies = [("msgs", "0128_procs"), ("orgs", "0047_procs")]

    operations = []#migrations.RunSQL(SQL)]