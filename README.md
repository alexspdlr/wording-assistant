## Start Docker
1. cd into server
2. run "docker build -t paraphrasing-app-server ." 
3. start docker desktop
4. click "run" on image called "paraphrasing-app-server"

## To Deploy this
1. Open filezilla
2. make sure an empty "root/app" directory exists (remote)
3. create a "client" directory inside the "root/app" directory (remote)
4. copy everything from the "client" folder (local) to "root/app/client" (remote), except for node_modules & build & .DS_Store
5. cd back to "root/app" (remote)
6. copy everything from the "root" folder (local) to "root/app" (remote), except for node_modules & build & .DS_Store & README.md & .git & client & .gitignore
7. open the droplet console in digital ocean droplet panel
8. cd into app & run "ls -a" to check if all files have been copied 
9. Stop All Docker Containers running "docker kill $(docker ps -q)"
10. Remove All Docker Containers running "docker rm $(docker ps -a -q)"
11. Remove All Docker Images running "docker rmi $(docker images -q)"
12. Create the new image running "docker build -t app-image ." while in the "remote/app" directory
13. Run the newly created image by running "docker run -it -d -p 3001:3001 app-image"
14. OPTIONAL: View log running "docker logs -f <container-id>" (container-id is logged in the console after running the image)
15. Open http://<droplet-ip>:3001 on your local machine and check if it works



https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-20-04
UBUNTU LOGIN ON SERVER: 
ssh alex@206.81.19.237

VNC: 
https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-vnc-on-ubuntu-22-04

connect to :
localhost:59000
