FROM caddy:2-alpine
COPY . /srv
COPY Caddyfile /etc/caddy/Caddyfile
# Remove deployment files from served content
RUN rm -f /srv/Dockerfile /srv/Caddyfile /srv/fly.toml /srv/CNAME
# Remove the old /app redirect page (Caddy handles /app now)
RUN rm -rf /srv/app
EXPOSE 8080
