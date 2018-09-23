import gql from 'graphql-tag'
import Link from 'next/link'
import { graphql } from 'react-apollo'
import { Button, Card, CardBody, CardColumns, CardImg, CardSubtitle } from 'reactstrap';
import { CardText, CardTitle, Col, Row } from 'reactstrap'

const RestaurantList = ({
	data: { loading, error, restaurants },
	search
}) => {
	if (error)
		return "Error loading restaurants"
	//if restaurants are returned from the GraphQL query, run the filter query
	//and set equal to variable restaurantSearch
	if (restaurants && restaurants.length) {
		//searchQuery
		const searchQuery = restaurants.filter(
			query => query.name.toLowerCase().includes(search)
		)
		if (searchQuery.length != 0) {
			return (
				<div className="container-fluid">

					<CardColumns className="h-100" >
					{
						restaurants.map(res =>
						<Card className="h-100" style={{ marginBottom: 0, position: 'relative' }} key={res._id}>
							<CardImg top={true} style={{ height:250 }}src={`http://localhost:1337${res.image.url}`}/>
							<CardBody>
								<CardTitle>{res.name}</CardTitle>
								<CardText>{res.description}</CardText>
							</CardBody>
							<div className="card-footer">
								<Link as={`/restaurants/${res.name.replace(/\s+/g, '-').toLowerCase()}`}
								 			href={`/restaurants?id=${res._id}`}>
									<a className="btn btn-primary">View</a>
								</Link>
							</div>
						</Card> )}
					</CardColumns>

					<style jsx global>
						{`
							a {
								color: white;
							}
							a:link {
								text-decoration: none;
								color: white;
							}
							a:hover {
								color: white;
							}
						`}
					</style>
				</div>
			);
		} else {
			return <h1>No Restaurants Found</h1>
		}
	}
	return <h1>Loading</h1>
}

const query = gql `
{
	restaurants {
    _id
    name
    description
    image { url }
  }
}
`
// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (RestaurantList)
export default graphql(query, {
	props: ({ data }) => ({
		data
	})
})(RestaurantList)