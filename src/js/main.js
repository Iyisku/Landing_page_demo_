const tradeOffers = [
    { id: "XGP-092", name: "Xbox Game Pass Ultimate", type: "RENT", duration: "14 Days", price: "$9.99" },
    { id: "PSP-114", name: "PS Plus Premium", type: "RENT", duration: "1 Month", price: "$13.50" },
    { id: "NSO-883", name: "NSO + Expansion Pack", type: "SELL", duration: "12 Months", price: "$29.99" },
    { id: "PCG-441", name: "PC Game Pass", type: "TRADE", duration: "Swap Request", price: "Equal Value" },
    { id: "EAP-772", name: "EA Play Pro", type: "SELL", duration: "1 Year Code", price: "$79.99" },
    { id: "STM-559", name: "Steam Wallet $50", type: "TRADE", duration: "Swap Request", price: "Trade" },
    { id: "NIN-332", name: "Nintendo eShop $40", type: "SELL", duration: "Instant Code", price: "$36.00" },
    { id: "XGP-778", name: "Xbox Live Gold 3M", type: "RENT", duration: "90 Days", price: "$24.99" }
];

function renderTradeTable(filter = 'ALL') {
    const tbody = document.getElementById('tradeListBody');
    if (!tbody) return;

    const filteredOffers = filter === 'ALL'
        ? tradeOffers
        : tradeOffers.filter(offer => offer.type === filter);

    tbody.innerHTML = filteredOffers.map(offer => {
        let actionClass = offer.type === 'RENT' ? 'text-[#fcee0a] hover:bg-[#fcee0a] hover:text-black border-[#fcee0a]' :
            offer.type === 'SELL' ? 'text-white hover:bg-white hover:text-black border-white' :
                'text-[#ff003c] hover:bg-[#ff003c] hover:text-black border-[#ff003c]';

        let typeColor = offer.type === 'RENT' ? 'text-[#fcee0a]' :
            offer.type === 'SELL' ? 'text-white' :
                'text-[#ff003c]';

        return `<tr class="border-b border-gray-900 hover:bg-[#0a0a0a] transition-all duration-200">
      <td class="px-6 py-4"><span class="text-gray-400 mr-3 text-xs">[${offer.id}]</span> <span class="text-white font-medium">${offer.name}</span></td>
      <td class="px-6 py-4 ${typeColor} font-bold tracking-wider">${offer.type}</td>
      <td class="px-6 py-4 text-gray-400">${offer.duration}</td>
      <td class="px-6 py-4 text-white font-bold">${offer.price}</td>
      <td class="px-6 py-4 text-right">
        <button class="border px-4 py-1.5 text-xs transition-all uppercase tracking-wider ${actionClass}">INITIATE</button>
      </td>
    </tr>`;
    }).join('');
}

function bindMarketFilters() {
    const filterBtns = document.querySelectorAll('.market-filter-btn');
    const tableContainer = document.querySelector('#market .overflow-x-auto');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Update button UI
            filterBtns.forEach(b => {
                b.classList.remove('bg-[#fcee0a]', 'text-black', 'active-filter');
                b.classList.add('border', 'border-gray-700', 'text-gray-400');
            });

            btn.classList.remove('border', 'border-gray-700', 'text-gray-400');
            btn.classList.add('bg-[#fcee0a]', 'text-black', 'active-filter');

            // Apply simulation effect
            if (tableContainer) {
                tableContainer.classList.add('market-updating');

                setTimeout(() => {
                    renderTradeTable(filter);
                    tableContainer.classList.remove('market-updating');
                }, 400);
            } else {
                renderTradeTable(filter);
            }
        });
    });
}

// Add interactive alerts for buttons
function bindInteractivity() {
    document.querySelectorAll('.btn-cyber, .btn-outline, button, a[href="#"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const text = btn.innerText.toUpperCase();

            // Prevent default for anchor tags or buttons that might submit
            if (btn.tagName === 'A' && btn.getAttribute('href') === '#') {
                e.preventDefault();
            }

            if (text.includes('RENT PASS')) {
                showTerminalPopup('INITIATE RENTAL PROTOCOL', 'Scanning 1,200+ active nodes... <br><br>Secure escrow activated. Connection status: <span class="text-green-500">STABLE</span>');
            } else if (text.includes('LIST ITEM') || text.includes('LIST AN ITEM')) {
                showTerminalPopup('LISTING CREATION MODE', 'Synchronizing with marketplace... <br><br>Please set your duration and value parameters in the listing terminal.');
            } else if (text.includes('LOGIN')) {
                showTerminalPopup('ENCRYPTED CONNECTION REQUIRED', 'Neural-link synchronization failed. <br><br>Please connect your hardware wallet or bio-signature device to continue.');
            } else if (text.includes('ACCEPT SWAP') || text.includes('INITIATE') || text.includes('EXECUTE')) {
                showTerminalPopup('TRANSACTION INITIATED', 'Atomic swap protocol engaged. <br><br>Smart contract escrow locked. Awaiting counterparty cryptographic confirmation.');
            } else if (text.includes('LAUNCH DASHBOARD')) {
                showTerminalPopup('ACCESSING CORE TERMINAL', 'Decrypting user data stream... <br><br>Dashboard loading in 3... 2... 1...');
            } else if (text.includes('EXPLORE RENTALS')) {
                showTerminalPopup('FILTERING ACTIVE LISTINGS', 'Accessing global pass database... <br><br>847 matches found across all regions.');
            } else if (text.includes('BROWSE SWAPS')) {
                showTerminalPopup('SCANNING P2P NETWORK', 'Retrieving available swap requests... <br><br>Network latency: 12ms. Peer verification: <span class="text-[#fcee0a]">VERIFIED</span>');
            } else if (text.includes('INITIALIZE FREE')) {
                showTerminalPopup('NEON PROTOCOL ACTIVATED', 'Basic trader license established. <br><br>5% fee structure applied to all successful exchanges.');
            } else if (text.includes('UPGRADE PROTOCOL')) {
                showTerminalPopup('CYBER LICENSE UPGRADE', 'Synchronizing optimized fee structure (1.5%). <br><br>Instant release and priority matching protocols now <span class="text-green-500">ACTIVE</span>.');
            } else if (text.includes('ESTABLISH TITAN')) {
                showTerminalPopup('TITAN CLASS CLEARANCE GRANTED', 'Establishing direct node connection. <br><br>0% fee protocol active. Welcome to the elite tier, Trader.');
            } else if (text.includes('VIEW ALL LISTINGS')) {
                showTerminalPopup('EXPANDING DATASET', 'Retrieving full marketplace index... <br><br>Warning: High volume of data points. Filtering by reputation score recommended.');
            } else if (text.includes('CREATE CUSTOM SWAP')) {
                showTerminalPopup('SWAP CONSTRUCTOR', 'Initializing peer-to-peer exchange builder... <br><br>Please select the assets you wish to offer and your desired target.');
            } else if (text.includes('TERMS')) {
                showTerminalPopup('LEGAL PROTOCOLS', 'Accessing smart-contract terms and conditions... <br><br>All trades are final once confirmed by the decentralized escrow authority.');
            } else if (text.includes('PRIVACY')) {
                showTerminalPopup('DATA ENCRYPTION POLICY', 'Your privacy is secured by 256-bit end-to-end encryption. <br><br>No personal data is stored on central servers — only on-chain signatures.');
            } else if (text.includes('SUPPORT')) {
                showTerminalPopup('SYSTEM ASSISTANCE', 'Connecting to support terminal... <br><br>A technician will be assigned to your neural-link shortly. Average wait time: 2ms.');
            } else if (text.includes('API')) {
                showTerminalPopup('DEVELOPER TERMINAL', 'Accessing API documentation... <br><br>Standard REST and WebSocket endpoints available for high-frequency trading bots.');
            } else if (text.includes('SEND TRANSMISSION')) {
                showTerminalPopup('DATA BROADCAST SUCCESSFUL', 'Your message payload has been encrypted and broadcast to the support node network. <br><br>Transmission ID: <span class="text-[#fcee0a]">RP-8829-X</span>. Expect a response shortly.');
            } else if (text.includes('BROWSE ALL')) {
                showTerminalPopup('ACCESSING SWAP ARCHIVE', 'Retrieving historical and upcoming swap requests... <br><br>Network status: <span class="text-green-500">OPTIMIZED</span>. Found 312 available p2p matches.');
            } else if (text.includes('VIEW ALL LISTINGS')) {
                showTerminalPopup('GLOBAL MARKET OVERVIEW', 'Loading complete market snapshot... <br><br>Aggregating 1,234 active listings across all gaming ecosystems.');
            } else if (text.includes('CREATE CUSTOM SWAP')) {
                showTerminalPopup('SWAP PROTOCOL INITIALIZED', 'Enter your desired exchange parameters. <br><br>Our matching engine will broadcast your request to the p2p network once confirmed.');
            }
        });
    });
}

function showTerminalPopup(title, message) {
    const modal = document.getElementById('terminalModal');
    const content = document.getElementById('modalContent');
    const titleEl = document.getElementById('modalTitle');
    const bodyEl = document.getElementById('modalBody');

    if (!modal || !content || !titleEl || !bodyEl) return;

    titleEl.innerText = title;
    bodyEl.innerHTML = message;

    modal.classList.remove('opacity-0', 'pointer-events-none');
    content.classList.remove('scale-95');
}

function closeTerminalPopup() {
    const modal = document.getElementById('terminalModal');
    const content = document.getElementById('modalContent');

    if (!modal || !content) return;

    modal.classList.add('opacity-0', 'pointer-events-none');
    content.classList.add('scale-95');
}

window.addEventListener('DOMContentLoaded', () => {
    renderTradeTable();
    bindInteractivity();
    bindMarketFilters();

    // Close modal event listeners
    const closeModalBtn = document.getElementById('closeModal');
    const modalConfirmBtn = document.getElementById('modalConfirm');
    const terminalModal = document.getElementById('terminalModal');

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeTerminalPopup);
    if (modalConfirmBtn) modalConfirmBtn.addEventListener('click', closeTerminalPopup);

    // Close on backdrop click
    if (terminalModal) {
        terminalModal.addEventListener('click', (e) => {
            if (e.target === terminalModal) closeTerminalPopup();
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) mobileMenu.classList.add('hidden');
        });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-animate').forEach(el => {
        // Skip elements that already have animate-slide-up
        if (!el.classList.contains('animate-slide-up')) {
            observer.observe(el);
        }
    });
});

// Live Trading Visualization
function initLiveTradingVisualization() {
    const canvas = document.getElementById('liveTradingCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    // Set canvas size properly
    function resizeCanvas() {
        const container = canvas.parentElement;
        width = container.clientWidth;
        height = 250;
        canvas.width = width;
        canvas.height = height;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let dataPoints = Array(60).fill(0).map(() => 50 + Math.random() * 50);
    let volumeData = Array(60).fill(0).map(() => 20 + Math.random() * 80);
    let frame = 0;

    // Trading pairs data
    const trades = [
        { pair: 'XGP→PS+', price: 12.45, change: '+2.3%' },
        { pair: 'NSO→PCGP', price: 8.90, change: '-0.7%' },
        { pair: 'EA PRO', price: 15.99, change: '+5.2%' },
        { pair: 'STEAM', price: 42.50, change: '+1.1%' }
    ];

    function drawGlow(ctx, x, y, radius, color) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    function draw() {
        if (!ctx || width === 0) return;

        // Add subtle noise for CRT effect
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);

        // Draw grid lines
        ctx.strokeStyle = '#fcee0a20';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < 4; i++) {
            const y = height - (i * height / 4);
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        for (let i = 0; i < 6; i++) {
            const x = i * width / 5;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        // Draw price line with glow
        const step = width / (dataPoints.length - 1);
        ctx.beginPath();
        let first = true;
        for (let i = 0; i < dataPoints.length; i++) {
            const x = i * step;
            const y = height - (dataPoints[i] / 100) * height;
            if (first) {
                ctx.moveTo(x, y);
                first = false;
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.strokeStyle = '#fcee0a';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Glow effect
        ctx.beginPath();
        for (let i = 0; i < dataPoints.length; i++) {
            const x = i * step;
            const y = height - (dataPoints[i] / 100) * height;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = '#fcee0a';
        ctx.lineWidth = 4;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#fcee0a';
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Fill area under curve
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fillStyle = '#fcee0a10';
        ctx.fill();

        // Draw volume bars
        const barWidth = step * 0.6;
        for (let i = 0; i < volumeData.length; i++) {
            const x = i * step + (step - barWidth) / 2;
            const barHeight = (volumeData[i] / 100) * (height * 0.3);
            ctx.fillStyle = i % 2 === 0 ? '#ff003c80' : '#00f3ff80';
            ctx.fillRect(x, height - barHeight, barWidth, barHeight);
        }

        // Update data points - random walk
        const last = dataPoints[dataPoints.length - 1];
        let change = (Math.random() - 0.48) * 8;
        let newVal = Math.min(95, Math.max(10, last + change));
        dataPoints.push(newVal);
        dataPoints.shift();

        volumeData.push(20 + Math.random() * 80);
        volumeData.shift();

        // Draw trade ticker at bottom
        ctx.font = 'bold 10px "Share Tech Mono", monospace';
        ctx.fillStyle = '#fcee0a';
        ctx.shadowBlur = 0;

        let tickerText = '';
        trades.forEach(t => {
            const changeColor = t.change.startsWith('+') ? '#00ff88' : '#ff003c';
            tickerText += `${t.pair} $${t.price} `;
        });

        // Scrolling ticker
        const scrollOffset = (frame % (tickerText.length * 8)) / 8;
        ctx.fillStyle = '#fcee0a';
        ctx.fillText(`> ${tickerText.repeat(3)}`, width - scrollOffset * 6, height - 8);

        // Draw active orders overlay
        ctx.font = 'bold 13px "Share Tech Mono", monospace';
        ctx.fillStyle = '#fcee0a';
        ctx.fillText(`ACTIVE ORDERS: ${Math.floor(120 + Math.sin(frame * 0.05) * 30)}`, 10, 20);
        ctx.fillStyle = '#ffffffff';
        ctx.font = '12px monospace';
        ctx.fillText(`VOLUME: $${(24500 + Math.sin(frame * 0.1) * 5000).toFixed(0)}`, 10, 38);

        frame++;
        requestAnimationFrame(draw);
    }

    draw();
}

// Call this in DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
    initLiveTradingVisualization();
    // ... rest of your existing code
});
