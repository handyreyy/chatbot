# ==== Build Stage ====
FROM golang:1.24 AS builder
WORKDIR /app

COPY nlp/go.mod nlp/go.sum ./nlp/
RUN cd nlp && go mod download

COPY nlp/ ./nlp/
WORKDIR /app/nlp
RUN go build -o chatbot .

# ==== Run Stage ====
FROM golang:1.24 AS runtime

WORKDIR /app
COPY --from=builder /app/nlp/chatbot .

COPY mock-data/ ./mock-data/

EXPOSE 8080
CMD ["./chatbot"]
