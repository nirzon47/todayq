// Standard route for health checks
export const GET = () => {
	return Response.json({ success: true, message: 'Healthy!' })
}
