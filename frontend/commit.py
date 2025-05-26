import os, time

def commit():
    while True:
        os.system("git add .")
        os.system("git commit -m 'update'")
        os.system("git push origin master")
        time.sleep(10)

  
commit()
