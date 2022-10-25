fmt:
	deno fmt --config fmt.json

run:
	deno run --allow-net --allow-env --allow-read ./src/member/main.ts