FROM nginx:1.25.3

COPY etc/nginx.conf /etc/nginx/nginx.conf
COPY build /usr/share/nginx/html
