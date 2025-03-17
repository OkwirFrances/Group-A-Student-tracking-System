import os, time

def commit():
    while True:
        os.system("git add .")
        os.system("git commit -m 'update'")
        os.system("git push origin timo")
        time.sleep(120)

    
commit()