PORTS=( 8080 8081 8082 8083 8084 8085 )
HOST=45.55.77.201

for port in "${PORTS[@]}"
do
    echo ""
    echo "======================================================================"
    echo "Executing tests for ${HOST}:${port}"
    echo "======================================================================"
    echo ""
	PORT=${port} HOST=${HOST} make test
done