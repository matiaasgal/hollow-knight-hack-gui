import pymem
import pymem.process
import sys

pm = pymem.Pymem("hollow_knight.exe")
mono = pymem.process.module_from_name(pm.process_handle, "mono-2.0-bdwgc.dll").lpBaseOfDll
parametroRecibido = int(sys.argv[1]) # se recibe el parametro desde js

offsets = [0x497DA8, 0xC0, 0x18, 0xC8, 0x1C4]

first_ptr_addr = mono + offsets[0]

current = 0
first_ptr_value = pm.read_longlong(first_ptr_addr)
current = first_ptr_value

pointer_offsets = offsets[1:]
geo_value = 0
geo_address = 0

for i, off in enumerate(pointer_offsets, start=1):
    next_addr = current + off

    if i == len(pointer_offsets):
        geo_value = pm.read_int(next_addr)
        geo_address = next_addr
    else:
        current = pm.read_longlong(next_addr)

if geo_address != 0:
    pm.write_int(geo_address, parametroRecibido)
    nuevo_geo_leido = pm.read_int(geo_address)
