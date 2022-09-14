import React from 'react'
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap'
import { baseURL } from '../shared/baseURL';
import LoadingComponent from './LoadingComponent';

const MenuComponent = (props) => {

    const menu = props.dishes.dishes.map((dish) => {
        return (
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card>
                    <Link to={`/menu/${dish.id}`} >
                        <CardImg width="100%" src={baseURL+dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Link>
                </Card>
            </div>
        );
    });

    if (props.dishes.isLoading) {
        return (
            <div className='container'>
                <div className='row'>
                    <LoadingComponent/>
                </div>
            </div>
        )
    }
    else if (props.dishes.err) {
        return (
            <div className='container'>
                <div className='row'>
                    <h4>{props.err}</h4>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/home'>Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            Menu
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>Menu</h3>
                        <hr></hr>
                    </div>
                </div>
                <div className='row'>
                    {menu}
                </div>
            </div>
        )
    }
}

export default MenuComponent;