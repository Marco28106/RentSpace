-- Fix bookings schema: start_time and end_time should be time type, not timestamptz
ALTER TABLE bookings ALTER COLUMN start_time TYPE time USING start_time::time;
ALTER TABLE bookings ALTER COLUMN end_time TYPE time USING end_time::time;
