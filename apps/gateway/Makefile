build-for-prod:
	#rover subgraph introspect \
#	  http://localhost:2021/graphql | \
#	  APOLLO_KEY=service:utp-gateway-xv8lw9:hiMLi7QYK3pGfljTVJc5Yg \
#	  rover subgraph publish utp-gateway-xv8lw9@current \
#	  --name trips --schema - \
#	  --routing-url http://kulu-utp-trips-svc.default.svc.cluster.local/graphql

	rover subgraph introspect \
	  http://localhost:2022/graphql | \
	  APOLLO_KEY=service:utp-gateway-xv8lw9:hiMLi7QYK3pGfljTVJc5Yg \
	  rover subgraph publish utp-gateway-xv8lw9@current \
	  --name admin --schema - \
	  --routing-url http://kulu-utp-admin-svc.default.svc.cluster.local/graphql

	rover subgraph introspect \
	  http://localhost:2023/graphql | \
	  APOLLO_KEY=service:utp-gateway-xv8lw9:hiMLi7QYK3pGfljTVJc5Yg \
	  rover subgraph publish utp-gateway-xv8lw9@current \
	  --name tracking --schema - \
	  --routing-url http://kulu-utp-tracking-svc.default.svc.cluster.local/graphql

	rover subgraph introspect \
	  http://localhost:2024/graphql | \
	  APOLLO_KEY=service:utp-gateway-xv8lw9:hiMLi7QYK3pGfljTVJc5Yg \
	  rover subgraph publish utp-gateway-xv8lw9@current \
	  --name analytics --schema - \
	  --routing-url http://kulu-utp-analytics-svc.default.svc.cluster.local/graphql
 
build-for-dev:
	#rover subgraph introspect \
#	http://localhost:2021/graphql | \
#	APOLLO_KEY=service:utp-gateway-dev:6Aal6Yx_bFR8zUcttcWVkw \
#	rover subgraph publish utp-gateway-dev@current \
#	--name trips --schema - \
#	--routing-url http://localhost:2021/graphql
	#
	rover subgraph introspect \
	http://localhost:2022/graphql | \
	APOLLO_KEY=service:utp-gateway-dev:6Aal6Yx_bFR8zUcttcWVkw \
	rover subgraph publish utp-gateway-dev@current \
	--name admin --schema - \
	--routing-url http://localhost:2022/graphql

	rover subgraph introspect \
	http://localhost:2023/graphql | \
	APOLLO_KEY=service:utp-gateway-dev:6Aal6Yx_bFR8zUcttcWVkw \
	rover subgraph publish utp-gateway-dev@current \
	--name tracking --schema - \
	--routing-url http://localhost:2023/graphql

	rover subgraph introspect \
	http://localhost:2024/graphql | \
	APOLLO_KEY=service:utp-gateway-dev:6Aal6Yx_bFR8zUcttcWVkw \
	rover subgraph publish utp-gateway-dev@current \
	--name analytics --schema - \
	--routing-url http://localhost:2024/graphql