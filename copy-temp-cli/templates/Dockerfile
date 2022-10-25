# FROM指定使用哪个镜像作为基准
FROM registry.cn-hangzhou.aliyuncs.com/hbcloud-prod/nginx-web:1.0
# 拷贝文件到镜像中
COPY dist/ /usr/share/nginx/html/
RUN echo "Asia/Shanghai" > /etc/timezone