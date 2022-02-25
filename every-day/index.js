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

  // const featuredLink = await page.$eval('a.ui-search-billboard__action-button', node => node.href)
  const commonLinks = await page.$$eval('.ui-search-result__image a.ui-search-link', nodes =>
    nodes.map(node => node.href)
  )
  // return [featuredLink, ...commonLinks]
  return commonLinks
}

const HOUSES_BY_NEIGHBORHOOD = [
  {
    department: 'Montevideo',
    neighborhood: 'Malvín',
    url: 'https://listado.mercadolibre.com.uy/inmuebles/casas/venta/montevideo/malvin/_PriceRange_150000USD-300000USD_PublishedToday_YES_NoIndex_True?#applied_filter_id%3Dcity%26applied_filter_name%3DCiudades%26applied_filter_order%3D1%26applied_value_id%3DTUxVQ0JVQzNlMDdl%26applied_value_name%3DBuceo%26applied_value_order%3D2%26applied_value_results%3D2%26is_custom%3Dfalse',
    owner: 'MercadoLibre',
    getLinks: getMercadoLibreLinks
  },
  {
    department: 'Montevideo',
    neighborhood: 'Buceo',
    url: 'https://listado.mercadolibre.com.uy/inmuebles/casas/venta/montevideo/buceo/_PriceRange_150000USD-300000USD_PublishedToday_YES_NoIndex_True?#applied_filter_id%3Dcity%26applied_filter_name%3DCiudades%26applied_filter_order%3D1%26applied_value_id%3DTUxVQ0JVQzNlMDdl%26applied_value_name%3DBuceo%26applied_value_order%3D2%26applied_value_results%3D2%26is_custom%3Dfalse',
    owner: 'MercadoLibre',
    getLinks: getMercadoLibreLinks
  },
  {
    department: 'Montevideo',
    neighborhood: 'Parque Batlle',
    url: 'https://listado.mercadolibre.com.uy/inmuebles/casas/venta/montevideo/parque-batlle/_PriceRange_150000USD-300000USD_PublishedToday_YES_NoIndex_True?#applied_filter_id%3Dcity%26applied_filter_name%3DCiudades%26applied_filter_order%3D1%26applied_value_id%3DTUxVQ0JVQzNlMDdl%26applied_value_name%3DBuceo%26applied_value_order%3D2%26applied_value_results%3D2%26is_custom%3Dfalse',
    owner: 'MercadoLibre',
    getLinks: getMercadoLibreLinks
  },
  {
    department: 'Montevideo',
    neighborhood: 'Pocitos',
    url: 'https://listado.mercadolibre.com.uy/inmuebles/casas/venta/montevideo/pocitos/_PriceRange_150000USD-300000USD_PublishedToday_YES_NoIndex_True?#applied_filter_id%3Dcity%26applied_filter_name%3DCiudades%26applied_filter_order%3D1%26applied_value_id%3DTUxVQ0JVQzNlMDdl%26applied_value_name%3DBuceo%26applied_value_order%3D2%26applied_value_results%3D2%26is_custom%3Dfalse',
    owner: 'MercadoLibre',
    getLinks: getMercadoLibreLinks
  },
  {
    department: 'Montevideo',
    neighborhood: 'Punta Carretas',
    url: 'https://listado.mercadolibre.com.uy/inmuebles/casas/venta/montevideo/punta-carretas/_PriceRange_150000USD-300000USD_PublishedToday_YES_NoIndex_True?#applied_filter_id%3Dcity%26applied_filter_name%3DCiudades%26applied_filter_order%3D1%26applied_value_id%3DTUxVQ0JVQzNlMDdl%26applied_value_name%3DBuceo%26applied_value_order%3D2%26applied_value_results%3D2%26is_custom%3Dfalse',
    owner: 'MercadoLibre',
    getLinks: getMercadoLibreLinks
  },
  {
    department: 'Canelones',
    neighborhood: 'El Pinar',
    url: 'https://listado.mercadolibre.com.uy/inmuebles/casas/venta/canelones/el-pinar/_PriceRange_150000USD-300000USD_PublishedToday_YES_HAS*GARDEN_242085_NoIndex_True?#applied_filter_id%3Dstate%26applied_filter_name%3DUbicaci%C3%B3n%26applied_filter_order%3D1%26applied_value_id%3DTUxVUE1PTlo2MDIy%26applied_value_name%3DMontevideo%26applied_value_order%3D2%26applied_value_results%3D1%26is_custom%3Dfalse',
    owner: 'MercadoLibre',
    getLinks: getMercadoLibreLinks
  },
  {
    department: 'Canelones',
    neighborhood: 'Barra de Carrasco',
    url: 'https://listado.mercadolibre.com.uy/inmuebles/casas/venta/canelones/barra-de-carrasco/_PriceRange_150000USD-300000USD_PublishedToday_YES_HAS*GARDEN_242085_NoIndex_True?#applied_filter_id%3Dstate%26applied_filter_name%3DUbicaci%C3%B3n%26applied_filter_order%3D1%26applied_value_id%3DTUxVUE1PTlo2MDIy%26applied_value_name%3DMontevideo%26applied_value_order%3D2%26applied_value_results%3D1%26is_custom%3Dfalse',
    owner: 'MercadoLibre',
    getLinks: getMercadoLibreLinks
  }
]

module.exports = async function (context, myTimer) {
    const browser = await chromium.launch()
    let countLinks = 0;
    const formattedFilters = `<b>Filtros:</b> <code>casas</code>, <code>venta</code>, <code>150K-300K</code>, <code>jardín</code>, <code>publicadas hoy</code> 🤞`
            
    bot.sendMessage(process.env.TELEGRAM_CHAT_ID, formattedFilters, { parse_mode: 'HTML', disable_web_page_preview: true })

    try {
        for (const neighborhoodInfo of HOUSES_BY_NEIGHBORHOOD) {
            const { getLinks, neighborhood, url } = neighborhoodInfo
            const links = await getLinks({ browser, url })

            if (links.length > 0) {
                countLinks+=links.length
                
                let formattedLinks = `<b>🏡 Casas en ${neighborhood} 😃</b>`

                for (const link of links) {
                formattedLinks += `<pre>\n</pre>${link}<pre>\n</pre>`
                }
                console.log(formattedLinks)

                bot.sendMessage(process.env.TELEGRAM_CHAT_ID, formattedLinks, { parse_mode: 'HTML', disable_web_page_preview: true })
            }
        }
        if (countLinks === 0) {
            const formattedNoResults = `<b>🏡 Hoy no se encontraron resultados... 😞</b>`
            bot.sendMessage(process.env.TELEGRAM_CHAT_ID, formattedNoResults, { parse_mode: 'HTML', disable_web_page_preview: true })
        }
    } catch (error) {
        context.log('ERROR')
    } finally {
        context.log('Browser closed!')
        await browser.close()
    }

    context.res = {
        body: {
            status: 'OK'
        },
        headers: {
            "content-type": "application/json"  
        }
    }
};
