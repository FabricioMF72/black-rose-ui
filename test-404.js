// Script para verificar que las páginas no existentes devuelvan 404
const https = require('https');
const http = require('http');

function checkUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    const req = client.request(url, {
      method: 'HEAD'
    }, (res) => {
      resolve({
        url: url,
        statusCode: res.statusCode,
        headers: res.headers
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    req.end();
  });
}

async function test404Pages() {
  const baseUrl = process.argv[2] || 'http://localhost:4000';
  
  const testUrls = [
    `${baseUrl}/test_error_page_url`,
    `${baseUrl}/nonexistent-page`,
    `${baseUrl}/fake-article/something`,
    `${baseUrl}/random-path-123`,
    `${baseUrl}/admin`,
    `${baseUrl}/wp-admin`,
    `${baseUrl}/blog/nonexistent-post`
  ];
  
  console.log('🔍 Verificando páginas 404...\n');
  
  let allPassed = true;
  
  for (const url of testUrls) {
    try {
      const result = await checkUrl(url);
      
      if (result.statusCode === 404) {
        console.log(`✅ ${url}`);
        console.log(`   Status: ${result.statusCode} ✓`);
        if (result.headers['x-frame-options']) {
          console.log(`   X-Frame-Options: ${result.headers['x-frame-options']} ✓`);
        }
      } else {
        console.log(`❌ ${url}`);
        console.log(`   Status: ${result.statusCode} (debería ser 404)`);
        allPassed = false;
      }
      console.log('');
    } catch (error) {
      console.log(`❌ ${url}`);
      console.log(`   Error: ${error.message}`);
      allPassed = false;
      console.log('');
    }
  }
  
  if (allPassed) {
    console.log('🎉 ¡Todas las páginas devuelven 404 correctamente!');
    console.log('✅ El error "Non-existent pages don\'t respond 404 HTTP status code" está RESUELTO');
  } else {
    console.log('❌ Algunas páginas no devuelven 404. Revisar configuración.');
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  test404Pages().catch(console.error);
}

module.exports = { test404Pages, checkUrl };