#!/usr/bin/env node

/**
 * Script de verificación de headers de seguridad
 * Ejecutar: node security-test.js <URL>
 */

const https = require('https');
const http = require('http');
const url = require('url');

function testSecurityHeaders(targetUrl) {
  const urlObj = url.parse(targetUrl);
  const isHttps = urlObj.protocol === 'https:';
  const client = isHttps ? https : http;
  
  console.log(`🔍 Verificando headers de seguridad para: ${targetUrl}`);
  console.log('=' .repeat(60));
  
  const options = {
    hostname: urlObj.hostname,
    port: urlObj.port || (isHttps ? 443 : 80),
    path: urlObj.path || '/',
    method: 'HEAD'
  };

  const req = client.request(options, (res) => {
    console.log(`📊 Status Code: ${res.statusCode}`);
    console.log('');
    
    // Headers de seguridad críticos
    const securityHeaders = [
      'x-frame-options',
      'x-content-type-options',
      'x-xss-protection',
      'content-security-policy',
      'referrer-policy',
      'permissions-policy',
      'strict-transport-security'
    ];
    
    console.log('🛡️ HEADERS DE SEGURIDAD:');
    console.log('-' .repeat(40));
    
    let missingHeaders = [];
    let presentHeaders = [];
    
    securityHeaders.forEach(header => {
      const value = res.headers[header];
      if (value) {
        presentHeaders.push(header);
        console.log(`✅ ${header.toUpperCase()}: ${value}`);
      } else {
        missingHeaders.push(header);
        console.log(`❌ ${header.toUpperCase()}: NO CONFIGURADO`);
      }
    });
    
    console.log('');
    console.log('📋 RESUMEN:');
    console.log('-' .repeat(40));
    console.log(`✅ Headers presentes: ${presentHeaders.length}/${securityHeaders.length}`);
    console.log(`❌ Headers faltantes: ${missingHeaders.length}/${securityHeaders.length}`);
    
    // Verificación específica de X-Frame-Options
    console.log('');
    console.log('🎯 ANÁLISIS X-FRAME-OPTIONS:');
    console.log('-' .repeat(40));
    
    const xFrameOptions = res.headers['x-frame-options'];
    if (xFrameOptions) {
      const value = xFrameOptions.toLowerCase();
      if (value === 'deny') {
        console.log('✅ EXCELENTE: X-Frame-Options configurado como DENY');
        console.log('   → Máxima protección contra clickjacking');
      } else if (value === 'sameorigin') {
        console.log('⚠️ BUENO: X-Frame-Options configurado como SAMEORIGIN');
        console.log('   → Permite iframes del mismo origen');
      } else if (value.startsWith('allow-from')) {
        console.log('⚠️ LIMITADO: X-Frame-Options configurado como ALLOW-FROM');
        console.log('   → Permite iframes de dominios específicos');
      }
    } else {
      console.log('❌ CRÍTICO: X-Frame-Options NO CONFIGURADO');
      console.log('   → Vulnerable a ataques de clickjacking');
    }
    
    // Score de seguridad
    const securityScore = (presentHeaders.length / securityHeaders.length) * 100;
    console.log('');
    console.log('🏆 SCORE DE SEGURIDAD:');
    console.log('-' .repeat(40));
    
    if (securityScore >= 90) {
      console.log(`🟢 EXCELENTE: ${securityScore.toFixed(1)}%`);
    } else if (securityScore >= 70) {
      console.log(`🟡 BUENO: ${securityScore.toFixed(1)}%`);
    } else if (securityScore >= 50) {
      console.log(`🟠 REGULAR: ${securityScore.toFixed(1)}%`);
    } else {
      console.log(`🔴 CRÍTICO: ${securityScore.toFixed(1)}%`);
    }
    
    // Recomendaciones
    if (missingHeaders.length > 0) {
      console.log('');
      console.log('💡 RECOMENDACIONES:');
      console.log('-' .repeat(40));
      missingHeaders.forEach(header => {
        switch(header) {
          case 'x-frame-options':
            console.log('• Agregar X-Frame-Options: DENY para prevenir clickjacking');
            break;
          case 'x-content-type-options':
            console.log('• Agregar X-Content-Type-Options: nosniff para prevenir MIME sniffing');
            break;
          case 'content-security-policy':
            console.log('• Implementar Content Security Policy para prevenir XSS');
            break;
          case 'strict-transport-security':
            console.log('• Agregar HSTS para forzar conexiones HTTPS');
            break;
        }
      });
    }
  });
  
  req.on('error', (e) => {
    console.error(`❌ Error al conectar: ${e.message}`);
  });
  
  req.end();
}

// Ejecutar el test
const targetUrl = process.argv[2] || 'http://localhost:4000';
testSecurityHeaders(targetUrl);