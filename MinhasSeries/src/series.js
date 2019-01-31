import React, {Component} from 'react'
import apis from './api'


const statustranslate ={
  'watched':'Watched',
  'watching' : 'Watching',
  'toWatch': 'To Watch'

}


class Series extends Component{

  constructor(props){
    super(props)

    this.state = {
      isLoading: false,
      series:[]
    }
    this.loadData = this.loadData.bind(this)
    this.renderSeries=this.renderSeries.bind(this)
  }

  componentDidMount(){
    this.loadData()

  }

  loadData(){
    apis.loadSeriesByGenre(this.props.match.params.genre).then((res)=>{this.setState({
      isLoading:false,
      series: res.data

  })})
  }

  deleteSeries(id){
    apis.deleteSeries(id).then((res)=> this.loadData())
  }


  renderSeries(series){

    return(

<div className="item  col-xs-4 col-lg-4">
              <div className="thumbnail">
                <img className="group list-group-image" src="http://placehold.it/400x250/000/fff" alt="" />

                <div className="caption">
                  <h4 className="group inner list-group-item-heading">
                    {series.name}</h4>
                  <div className="row">
                    <div className="col-xs-12 col-md-6">
                      <p className="lead">
                        {series.genre}/{statustranslate[series.status]}</p>
                    </div>
                    <div className="col-xs-12 col-md-6">
                      <a className="btn btn-success" href="">Editar</a> &nbsp;
                      <a className="btn btn-danger" onClick={()=> this.deleteSeries(series.id)}>Excluir</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

    )

  }




  render(){
    return(
      <section className="intro-section">
          <h1>
            Series {this.props.match.params.genre}
          </h1>
         
          {
            this.state.isLoading && <p>Carregando, aguarde...</p>
          }
          {
              this.state.series.length === 0 && <div className='alert alert-info'>Nenhuma série cadastrada.</div>
              
          }


          <div id="series" className="row list-group">
            {
              !this.state.isLoading && this.state.series.map(this.renderSeries)
            
            }
        </div>


      </section>

    )
    
  }
}








export { Series}