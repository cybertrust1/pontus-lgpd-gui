FROM node as builder
WORKDIR /

RUN  git clone  --depth 1    --single-branch   --branch master https://github.com/pontusvision/pontus-lgpd-gui.git && \
     cd pontus-lgpd-gui && \
     ./build-local.sh


FROM alpine
RUN mkdir -p /opt/pontus/pontus-gui-lgpd
COPY --from=builder /pontus-lgpd-gui/build /opt/pontus/pontus-gui-lgpd/lib

