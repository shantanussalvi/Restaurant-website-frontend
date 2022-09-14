import React from 'react'
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap'
import { baseURL } from '../shared/baseURL'
import LoadingComponent from './LoadingComponent'
import { FadeTransform } from "react-animation-components";

const RenderCard = ({ item, isLoading, err }) => {

  if (isLoading) {
    return (
      <LoadingComponent />
    )
  }
  else if (err) {
    return (
      <h4>{err}</h4>
    )
  }
  else {
    return (
      <FadeTransform in
        transformProps={{
          exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
        <Card>
          <CardImg src={baseURL + item.image} alt={item.name} />
          <CardBody>
            <CardTitle>{item.name}</CardTitle>
            {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
            <CardText>{item.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    )
  }
}

const HomeComponent = (props) => {
  return (
    <div className='container'>
      <div className='row align-items-start'>
        <div className='col-12 col-md m-1'>
          <RenderCard item={props.dish} isLoading={props.dishesLoading} err={props.dishesErr} />
        </div>
        <div className='col-12 col-md m-1'>
          <RenderCard item={props.promo} isLoading={props.promosLoading} err={props.promosErr} />
        </div>
        <div className='col-12 col-md m-1'>
          <RenderCard item={props.leader} isLoading={props.leadersLoading} err={props.leadersErr}/>
        </div>
      </div>
    </div>
  )
}

export default HomeComponent