const { chromium } = require('playwright-chromium')
const TelegramBot = require('node-telegram-bot-api')

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN)

/* FILTROS APLICADOS:
* - Departamento
* - Barrio
* - Publicados hoy
* - Con jardín
* - Casas
* - Venta
* - U$S 150.000 a U$S 300.000
*/

const getMercadoLibreLinks = async ({ browser, url }) => {
  const page = await browser.newPage()
  await page.goto(url)

  const commonLinks = await page.$$eval('.ui-search-result__image a.ui-search-link', nodes =>
    nodes.map(node => node.href)
  )
  return commonLinks || []
}

const getInfoCasasLinks = async ({ browser, url }) => {
  const page = await browser.newPage()
  await page.goto(url)

  const commonLinks = await page.$$eval('.ant-card-cover a.containerLink', nodes =>
    nodes.map(node => node.href)
  )
  return commonLinks || []
}

const HOUSES_BY_NEIGHBORHOOD = [
  {
    department: 'Montevideo',
    neighborhood: 'Malvín',
    owners: [
      {
        name: 'MercadoLibre',
        url: 'https://listado.mercadolibre.com.uy/inmuebles/casas/venta/montevideo/malvin/_PriceRange_150000USD-300000USD_PublishedToday_YES_NoIndex_True?#applied_filter_id%3Dcity%26applied_filter_name%3DCiudades%26applied_filter_order%3D1%26applied_value_id%3DTUxVQ0JVQzNlMDdl%26applied_value_name%3DBuceo%26applied_value_order%3D2%26applied_value_results%3D2%26is_custom%3Dfalse',
        getLinks: getMercadoLibreLinks
      },
      {
        name: 'InfoCasas',
        url: 'https://www.infocasas.com.uy/venta/casas/montevideo/malvin/con-jardin/desde-150000/hasta-300000/dolares/publicado-hoy',
        getLinks: getInfoCasasLinks    
      }
    ]
  }, 
  {
    department: 'Montevideo',
    neighborhood: 'Buceo',
    owners: [
      {
        name: 'MercadoLibre',
        url: 'https://listado.mercadolibre.com.uy/inmuebles/casas/venta/montevideo/buceo/_PriceRange_150000USD-300000USD_PublishedToday_YES_NoIndex_True?#applied_filter_id%3Dcity%26applied_filter_name%3DCiudades%26applied_filter_order%3D1%26applied_value_id%3DTUxVQ0JVQzNlMDdl%26applied_value_name%3DBuceo%26applied_value_order%3D2%26applied_value_results%3D2%26is_custom%3Dfalse',
        getLinks: getMercadoLibreLinks
      },
      {
        name: 'InfoCasas',
        url: 'https://www.infocasas.com.uy/venta/casas/montevideo/buceo/con-jardin/desde-150000/hasta-300000/dolares/publicado-hoy',
        getLinks: getInfoCasasLinks    
      }
    ] 
  },
  {
    department: 'Montevideo',
    neighborhood: 'Parque Batlle',
    owners: [
      {
        name: 'MercadoLibre',
        url: 'https://listado.mercadolibre.com.uy/inmuebles/casas/venta/montevideo/parque-batlle/_PriceRange_150000USD-300000USD_PublishedToday_YES_NoIndex_True?#applied_filter_id%3Dcity%26applied_filter_name%3DCiudades%26applied_filter_order%3D1%26applied_value_id%3DTUxVQ0JVQzNlMDdl%26applied_value_name%3DBuceo%26applied_value_order%3D2%26applied_value_results%3D2%26is_custom%3Dfalse',
        getLinks: getMercadoLibreLinks
      },
      {
        name: 'InfoCasas',
        url: 'https://www.infocasas.com.uy/venta/casas/montevideo/parque-batlle/con-jardin/desde-150000/hasta-300000/dolares/publicado-hoy',
        getLinks: getInfoCasasLinks    
      }
    ]
  },
  {
    department: 'Montevideo',
    neighborhood: 'Pocitos',
    owners: [
      {
        name: 'MercadoLibre',
        url: 'https://listado.mercadolibre.com.uy/inmuebles/casas/venta/montevideo/pocitos/_PriceRange_150000USD-300000USD_PublishedToday_YES_NoIndex_True?#applied_filter_id%3Dcity%26applied_filter_name%3DCiudades%26applied_filter_order%3D1%26applied_value_id%3DTUxVQ0JVQzNlMDdl%26applied_value_name%3DBuceo%26applied_value_order%3D2%26applied_value_results%3D2%26is_custom%3Dfalse',
        getLinks: getMercadoLibreLinks
      },
      {
        name: 'InfoCasas',
        url: 'https://www.infocasas.com.uy/venta/casas/montevideo/pocitos-y-en-pocitos-nuevo/con-jardin/desde-150000/hasta-300000/dolares/publicado-hoy',
        getLinks: getInfoCasasLinks    
      }
    ]
  },
  {
    department: 'Montevideo',
    neighborhood: 'Punta Carretas',
    owners: [
      {
        name: 'MercadoLibre',
        url: 'https://listado.mercadolibre.com.uy/inmuebles/casas/venta/montevideo/punta-carretas/_PriceRange_150000USD-300000USD_PublishedToday_YES_NoIndex_True?#applied_filter_id%3Dcity%26applied_filter_name%3DCiudades%26applied_filter_order%3D1%26applied_value_id%3DTUxVQ0JVQzNlMDdl%26applied_value_name%3DBuceo%26applied_value_order%3D2%26applied_value_results%3D2%26is_custom%3Dfalse',
        getLinks: getMercadoLibreLinks
      },
      {
        name: 'InfoCasas',
        url: 'https://www.infocasas.com.uy/venta/casas/montevideo/punta-carretas/con-jardin/desde-150000/hasta-300000/dolares/publicado-hoy',
        getLinks: getInfoCasasLinks    
      }
    ]
  },
  {
    department: 'Canelones',
    neighborhood: 'El Pinar',
    owners: [
      {
        name: 'MercadoLibre',
        url: 'https://listado.mercadolibre.com.uy/inmuebles/casas/venta/canelones/el-pinar/_PriceRange_150000USD-300000USD_PublishedToday_YES_HAS*GARDEN_242085_NoIndex_True?#applied_filter_id%3Dstate%26applied_filter_name%3DUbicaci%C3%B3n%26applied_filter_order%3D1%26applied_value_id%3DTUxVUE1PTlo2MDIy%26applied_value_name%3DMontevideo%26applied_value_order%3D2%26applied_value_results%3D1%26is_custom%3Dfalse',
        getLinks: getMercadoLibreLinks
      },
      {
        name: 'InfoCasas',
        url: 'https://www.infocasas.com.uy/venta/casas/canelones/el-pinar/con-jardin/desde-150000/hasta-300000/dolares/publicado-hoy',
        getLinks: getInfoCasasLinks    
      }
    ]
  },
  {
    department: 'Canelones',
    neighborhood: 'Barra de Carrasco',
    owners: [
      {
        name: 'MercadoLibre',
        url: 'https://listado.mercadolibre.com.uy/inmuebles/casas/venta/canelones/barra-de-carrasco/_PriceRange_150000USD-300000USD_PublishedToday_YES_HAS*GARDEN_242085_NoIndex_True?#applied_filter_id%3Dstate%26applied_filter_name%3DUbicaci%C3%B3n%26applied_filter_order%3D1%26applied_value_id%3DTUxVUE1PTlo2MDIy%26applied_value_name%3DMontevideo%26applied_value_order%3D2%26applied_value_results%3D1%26is_custom%3Dfalse',
        getLinks: getMercadoLibreLinks
      },
      {
        name: 'InfoCasas',
        url: 'https://www.infocasas.com.uy/venta/casas/canelones/barra-de-carrasco/con-jardin/desde-150000/hasta-300000/dolares/publicado-hoy',
        getLinks: getInfoCasasLinks    
      }
    ]
  }
]

module.exports = async function (context, myTimer) {
    const browser = await chromium.launch()
    let countLinks = 0;
    const formattedFilters = `<b>Filtros:</b> <code>casas</code>, <code>venta</code>, <code>150K-300K</code>, <code>jardín</code>, <code>publicadas hoy</code> 🤞`
            
    bot.sendMessage(process.env.TELEGRAM_CHAT_ID, formattedFilters, { parse_mode: 'HTML', disable_web_page_preview: true })

    try {
        for (const neighborhoodInfo of HOUSES_BY_NEIGHBORHOOD) {
            const { neighborhood, owners } = neighborhoodInfo

            let links = []
            for (const owner of owners) {
              links = [ ...links, ...await owner.getLinks({ browser, url: owner.url }) ]
            }
            
            if (links.length > 0) {
                countLinks += links.length
                
                let formattedLinks = `<b>🏡 Casas en ${neighborhood} 😃</b>`

                for (const link of links) {
                  formattedLinks += `<pre>\n</pre>${link}<pre>\n</pre>`
                }
                (context || console).log(formattedLinks)

                bot.sendMessage(process.env.TELEGRAM_CHAT_ID, formattedLinks, { parse_mode: 'HTML', disable_web_page_preview: true })
            }
        }
        if (countLinks === 0) {
            const formattedNoResults = `<b>🏡 Hoy no se encontraron resultados... 😞</b>`
            bot.sendMessage(process.env.TELEGRAM_CHAT_ID, formattedNoResults, { parse_mode: 'HTML', disable_web_page_preview: true })
        }
    } catch (error) {
        (context || console).log(`ERROR: ${error}`)
    } finally {
        (context || console).log('Browser closed!')
        await browser.close()
    }

    if (context) {
      context.res = {
          body: {
              status: 'OK'
          },
          headers: {
              "content-type": "application/json"  
          }
      }
    }
};
