FROM python:3.6.0

# Add ssh demon
RUN apt-get update && apt-get install -y openssh-server && \
    mkdir /var/run/sshd && \
    echo 'root:root' | chpasswd && \
    sed -i 's/PermitRootLogin without-password/PermitRootLogin yes/' /etc/ssh/sshd_config && \
    # SSH login fix. Otherwise user is kicked off after login
    sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd && \
    echo 'cd /app/src' >> /root/.bashrc

VOLUME ["/app"]
COPY start.sh /scripts/start.sh
WORKDIR /app/src
ENTRYPOINT ["/scripts/start.sh"]
