import React, { useEffect, useState } from 'react';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { connect } from 'react-redux';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import Card from '../component/Card';
import Header from '../component/Header';
import Loader from '../component/Loader';
import NavBar from '../component/NavBar';
import { fetchFilms, fetchPeople, fetchPlanet, fetchSpecies, fetchStarships, fetchVehicles } from '../reduxHelper/actions';
import PageNotFound from './PageNotFound';

const itemsPerPage = 10;

function CardPage({ fetchData, pageData }) {
    const params = useParams();
    const [searchParam, setSearchParam] = useSearchParams();
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetchData(searchParam.get('page'));
        setPage(searchParam.get('page'));
    }, [fetchData, searchParam]);

    if(pageData.hasOwnProperty('errorCode')) {
        return <PageNotFound />
    }

    return (
        <div>
            <Header />
            <NavBar type={params.type} />
            {
                <div>
                    {pageData.loading ? <Loader /> :
                        pageData.error ? <h3  className='notFound'> Page Not Found </h3> :
                            <>
                                <main className='allCards'>
                                    {
                                        pageData && pageData.data &&
                                        pageData.data.filter(data => data.page === page).map(data => data.results).flat().map(data => {
                                            const id = Number(data.url.slice(data.url.slice(0, data.url.lastIndexOf('/')).lastIndexOf('/') + 1, data.url.lastIndexOf('/')))

                                            return <Link to={`/${params.type}/${id}`} key={id}>
                                                <Card img={`${params.type === 'people' ? 'characters' : params.type}/${id}`} name={data.name ? data.name : data.title} />
                                            </Link>
                                        })
                                    }
                                </main> <PaginationControl
                                    page={page}
                                    between={4}
                                    total={pageData.total}
                                    limit={itemsPerPage}
                                    next={true}
                                    last={true}
                                    changePage={(pageID) => {
                                        setSearchParam(pages => {
                                            return { ...pages, page: typeof (pageID) === 'number' ? pageID : Number(searchParam.get('page')) + 1 }
                                        });
                                    }}
                                    ellipsis={2}
                                />
                            </>}
                </div>
            }

        </div>
    )
}

const typeData = (state) => {
    switch (window.location.pathname.slice(1)) {
        case 'people': return state.people;
        case 'planets': return state.planet;
        case 'films': return state.films;
        case 'species': return state.species;
        case 'vehicles': return state.vehicles;
        case 'starships': return state.starships;
        default: return {errorCode: 404}
    }
}
const mapStateToProps = (state) => {
    return { pageData: typeData(state) };
}

const typeDispatch = (pageNO) => {
    switch (window.location.pathname.slice(1)) {
        case 'films': return fetchFilms(pageNO);
        case 'people': return fetchPeople(pageNO);
        case 'planets': return fetchPlanet(pageNO);
        case 'species': return fetchSpecies(pageNO);
        case 'vehicles': return fetchVehicles(pageNO);
        case 'starships': return fetchStarships(pageNO);
        default: return function () {
            // console.log('page not found')
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return { fetchData: pageNO => dispatch(typeDispatch(pageNO)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardPage);