import os, time

def commit():
    while True:
        os.system("git add .")
        os.system("git commit -m 'update'")
        os.system("git push origin timo")
        time.sleep(300)  # Sleep for 5 minutes

  
commit()