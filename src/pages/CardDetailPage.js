import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import Header from '../component/Header';
import NavBar from '../component/NavBar';
import Loader from '../component/Loader';
import { fetchFilmsDetail, fetchPeopleDetail, fetchPlanetDetail, fetchSpeciesDetail, fetchStarshipsDetail, fetchVehiclesDetail } from '../reduxHelper/actions';
import PageNotFound from './PageNotFound';

function CardDetailPage({ pageData, fetchData }) {

  const params = useParams();

  useEffect(() => {
    fetchData(params.id);
  }, [fetchData, params.id, params.type]);

  if (pageData.hasOwnProperty('errorCode')) {
    return <PageNotFound />
  }

  return (
    <div>
      <Header />
      <NavBar type={params.type} id={`${pageData.loading === false && pageData?.singleData?.all?.name ? pageData?.singleData?.all?.name : '' }`} />
      {
        pageData.loading ? <Loader /> :
          pageData.error ? <h3  className='notFound'> No Data Found </h3> :
            <main className='detailCard'>
              <div className='detailMain'>
                <div className='detailImg'>
                  <img src={`https://starwars-visualguide.com/assets/img/${params.type === 'people' ? 'characters' : params.type}/${params.id}.jpg`}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                    }}
                    alt="" />

                </div>
                <div className='details'>
                  <div className='detailTitle'>
                    <h2>{pageData?.singleData?.all?.name}</h2>
                  </div>
                  <div className='basicDetails'>
                    {
                      pageData && pageData.singleData && pageData.singleData.all &&
                      Object.entries(pageData?.singleData?.all)
                        .map(([key, value]) =>
                        (key !== 'name' && <div className='detailRow' key={key}>
                          <span className='detailHeading'>{key.split('_').join(" ")} : </span>
                          <span>{value}</span>
                        </div>))
                    }
                  </div>
                </div>
              </div>
              <div className='detailSub'>
                {
                  pageData && pageData.singleData && pageData.singleData.related &&
                  Object.entries(pageData?.singleData?.related)
                    .map(([key, value]) => {
                      return (
                        <div className='relatedDetail' key={key}>
                          <div className='relatedTitle'>Related {key}</div>
                          <div className='relatedData'>
                            {
                              (typeof (value) !== 'object') ?
                                (< div key={params.type}><span> {value} </span></div>)
                                : (
                                  value.map(data => {
                                    const id = Number(data.url.slice(data.url.slice(0, data.url.lastIndexOf('/')).lastIndexOf('/') + 1, data.url.lastIndexOf('/')))
                                    return (
                                      <Link to={`/${key}/${id}`} key={`${key}-${id}`}>
                                        <div className='relatedCard'>
                                          <img alt="" src={`https://starwars-visualguide.com/assets/img/${key === 'people' ? 'characters' : key}/${id}.jpg`}
                                            onError={({ currentTarget }) => {
                                              currentTarget.onerror = null;
                                              currentTarget.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                                            }}
                                          />
                                          <span> {key === 'films' ? data.title : data.name}</span>
                                        </div>
                                      </Link>)
                                  }))
                            }


                          </div>
                        </div>
                      )
                    })
                }
              </div>
            </main>
      }
    </div >
  );
}
const typeData = (state) => {
  switch (window.location.pathname.slice(1, window.location.pathname.lastIndexOf('/'))) {
    case 'people': return state.people;
    case 'planets': return state.planet;
    case 'films': return state.films;
    case 'species': return state.species;
    case 'vehicles': return state.vehicles;
    case 'starships': return state.starships;
    default: return { errorCode: 404 }
  }
}
const mapStateToProps = (state) => {
  return { pageData: typeData(state) };
}

const typeDispatch = (id) => {
  switch (window.location.pathname.slice(1, window.location.pathname.lastIndexOf('/'))) {
    case 'films': return fetchFilmsDetail(id);
    case 'people': return fetchPeopleDetail(id);
    case 'planets': return fetchPlanetDetail(id);
    case 'species': return fetchSpeciesDetail(id);
    case 'vehicles': return fetchVehiclesDetail(id);
    case 'starships': return fetchStarshipsDetail(id);
    default: return function () {
      // console.log('page not found')
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return { fetchData: id => dispatch(typeDispatch(id)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetailPage)