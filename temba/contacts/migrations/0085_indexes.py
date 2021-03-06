# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-07-16 17:03
from __future__ import unicode_literals

from django.db import migrations

SQL = """
CREATE OR REPLACE FUNCTION
  extract_jsonb_keys(_jsonb JSONB)
RETURNS TEXT[] AS $$
BEGIN
  RETURN ARRAY(SELECT * FROM JSONB_OBJECT_KEYS(_jsonb));
END;
$$ IMMUTABLE LANGUAGE plpgsql;

CREATE INDEX IF NOT EXISTS contact_fields_keys_idx ON contacts_contact USING GIN(extract_jsonb_keys(fields));

CREATE INDEX IF NOT EXISTS contacts_contact_modified_on_non_test ON contacts_contact(modified_on) WHERE is_test = FALSE;

"""


class Migration(migrations.Migration):

    dependencies = [("contacts", "0084_initial")]

    operations = [migrations.RunSQL(SQL)]
