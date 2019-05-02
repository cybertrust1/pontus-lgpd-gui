import PVGrid from './PVGrid';

//

class NavPanelLawfulBasisPVGrid extends PVGrid
{
  
  componentDidMount()
  {
    this.setNamespace("NavPanelLawfulBasis");
  
    super.componentDidMount();
    
    let colSettings = [];
    // colSettings[0] = {id: "Object.Lawful_Basis.Id", name: "Number", field:"Object.Lawful_Basis.Id", sortable:true  };
    colSettings[0] = {id: "Object.Lawful_Basis.Description", name: "Description", field:"Object.Lawful_Basis.Description", sortable:true  };
    
  
  
    this.setColumnSettings(colSettings);
    this.setExtraSearch({value:"Object.Lawful_Basis"});
  
  
  }
  
  
  
  getSearchObj = (from, to, searchstr, searchExact, cols, extraSearch, sortcol, sortdir) =>
  {
    this.from = from;
    this.to = to;
    
    let sortcolId = sortcol === null ? null : sortcol.id;
    
    
    let selectBody =
      "  .select('Description' " +
      "         ,'event_id' " +
      "         )";
    
    
    return {
      gremlin: "g.V().has('Metadata.Type.Object.Lawful_Basis',eq('Object.Lawful_Basis'))\n" +
        " .order()\n" +
        " .by(pg_orderCol == null ? 'Object.Lawful_Basis.Description' :pg_orderCol.toString() ,pg_orderDir == (1)? incr: decr)\n" +
        " .range(pg_from,pg_to)\n" +
        " .as('data')\n" +
        " .match(\n" +
        "   __.as('data').values('Object.Lawful_Basis.Description').as('Object.Lawful_Basis.Description')\n"+
        " , __.as('people').id().as('event_id')\n" +
        " )\n" +
        selectBody
      , bindings: {
        pg_from: from
        , pg_to: to
        , pg_orderCol: sortcolId
        , pg_orderDir: sortdir
      }
      
      
    };
  };
  
  // onError = (err, fromPage, toPage) =>
  // {
  //   // ignore.
  // };
  
  onSuccess = (resp) =>
  {
    
    let respParsed = {};
    let itemsParsed = [];
    
    
    try
    {
      if (typeof resp !== 'object')
      {
        respParsed = JSON.parse(resp);
      }
      else
      {
        respParsed = resp;
      }
      if (respParsed.status === 200)
      {
        let items = respParsed.data.result.data['@value'];
        
        
        for (let i = 0, ilen = items.length; i < ilen; i++)
        {
          let vals = items[i]['@value'];
          let itemParsed = {};
          
          for (let j = 0, jlen = vals.length; j < jlen; j += 2)
          {
            let key = vals[j];
            let val = vals[j + 1];
            if (val instanceof Object)
            {
              if (key === ("event_id"))
              {
                itemParsed['index'] = val['@value'];
              }
              else
              {
                if (val['@type'] === 'g:Date')
                {
                  itemParsed[key] = new Date(val['@value']);
                  
                }
                else
                {
                  itemParsed[key] = val['@value'];
                  
                }
              }
            }
            else
            {
              itemParsed[key] = val;
            }
          }
          itemsParsed[i] = (itemParsed);
          this.data[this.from + i] = itemsParsed[i];
          
        }
      }
      
      this.data.length = Math.min(itemsParsed.length + this.from, this.to); // limitation of the API
      
      if (this.data.length === this.to)
      {
        this.data.length++;
      }
      // if (this.data.length == this.to)
      
      this.req = null;
      
      this.onDataLoadedCb({from: this.from, to: this.to});
      
      
    }
    catch (e)
    {
      // e;
    }
    
    
  };
  
  
}


export default NavPanelLawfulBasisPVGrid;
