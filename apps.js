        document.addEventListener('DOMContentLoaded', function() {      

    // ── Tab switching ──
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.dataset.tab;
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === target) content.classList.add('active');
            });
            
            // Load data when switching to dashboard tab
            if (target === 'dashboard') {
                loadDashboardData();
            }
        });
    });

    // ── Social Fetch API Configuration ──
    const SOCIAL_FETCH_API = 'https://api.socialfetch.dev/v1';
    const API_CONFIG = {
        instagram: {
            endpoint: '/instagram/posts',
            params: { limit: 5, sort: 'reach_desc' }
        },
        tiktok: {
            endpoint: '/tiktok/posts',
            params: { limit: 5, sort: 'reach_desc' }
        },
        facebook: {
            endpoint: '/facebook/posts',
            params: { limit: 5, sort: 'reach_desc' }
        }
    };

    // ── Country Color Mapping ──
    const COUNTRY_COLORS = {
        'Singapore': 'var(--sg-color)',
        'Malaysia': 'var(--my-color)',
        'US': 'var(--us-color)',
        'UK': 'var(--uk-color)',
        'Australia': 'var(--au-color)'
    };

    // ── Format number for display ──
    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    // ── Generate country bar HTML ──
    function generateCountryBar(countries) {
        if (!countries || countries.length === 0) {
            return '<div class="country-text">No data</div>';
        }

        let barHtml = '<div class="country-bar">';
        let textHtml = '<div class="country-text">';
        
        countries.forEach(country => {
            const color = COUNTRY_COLORS[country.name] || '#94a3b8';
            barHtml += `<span style="width:${country.percentage}%; background:${color};"></span>`;
            textHtml += `${country.name} ${country.percentage}% · `;
        });
        
        barHtml += '</div>';
        textHtml = textHtml.slice(0, -3) + '</div>'; // Remove trailing " · "
        return barHtml + textHtml;
    }

    // ── Fetch data from Social Fetch API ──
    async function fetchSocialData(platform) {
        try {
            const config = API_CONFIG[platform];
            const url = SOCIAL_FETCH_API + config.endpoint;
            
            // For demo purposes, we'll use mock data since we don't have a real API key
            // In production, you would use: fetch(url, { headers: { 'Authorization': 'Bearer YOUR_API_KEY' } })
            const mockData = getMockData(platform);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            return mockData;
        } catch (error) {
            console.error(`Error fetching ${platform} data:`, error);
            return getMockData(platform); // Fallback to mock data
        }
    }

    // ── Mock data generator (replace with real API calls) ──
    function getMockData(platform) {
        const mockData = {
            instagram: {
                posts: [
                    { id: 1, content: "Line Follower Robot Build Guide", type: "Reel", date: "2026-07-14", views: 1200000, likes: 89200, reach: 380500, countries: [{name: "Singapore", percentage: 45}, {name: "Malaysia", percentage: 25}, {name: "US", percentage: 15}, {name: "UK", percentage: 8}, {name: "Australia", percentage: 7}] },
                    { id: 2, content: "Raspberry Pi Pico LED Matrix", type: "Carousel", date: "2026-07-09", views: 980000, likes: 76500, reach: 310000, countries: [{name: "Malaysia", percentage: 35}, {name: "Singapore", percentage: 30}, {name: "US", percentage: 18}, {name: "UK", percentage: 10}, {name: "Australia", percentage: 7}] },
                    { id: 3, content: "Maker Faire SG 2026 Recap", type: "Reel", date: "2026-07-02", views: 750000, likes: 62100, reach: 250000, countries: [{name: "Singapore", percentage: 55}, {name: "Malaysia", percentage: 20}, {name: "US", percentage: 12}, {name: "UK", percentage: 7}, {name: "Australia", percentage: 6}] },
                    { id: 4, content: "EDU Kit Interactive Unboxing", type: "Reel", date: "2026-06-25", views: 620000, likes: 55800, reach: 210000, countries: [{name: "Malaysia", percentage: 38}, {name: "Singapore", percentage: 25}, {name: "US", percentage: 20}, {name: "UK", percentage: 10}, {name: "Australia", percentage: 7}] },
                    { id: 5, content: "MicroPython in 60 Seconds", type: "Reel", date: "2026-06-18", views: 540000, likes: 48300, reach: 180000, countries: [{name: "UK", percentage: 30}, {name: "US", percentage: 28}, {name: "Singapore", percentage: 20}, {name: "Malaysia", percentage: 12}, {name: "Australia", percentage: 10}] }
                ],
                totalReach: 380500,
                followers: 125000
            },
            tiktok: {
                posts: [
                    { id: 1, content: "Robot Car Assembly in 15 Seconds", type: "Video", date: "2026-07-16", views: 2100000, likes: 185300, reach: 680800, countries: [{name: "Singapore", percentage: 42}, {name: "Malaysia", percentage: 28}, {name: "US", percentage: 14}, {name: "UK", percentage: 9}, {name: "Australia", percentage: 7}] },
                    { id: 2, content: "LED Cube Electronics Hack", type: "Video", date: "2026-07-11", views: 1800000, likes: 152700, reach: 590000, countries: [{name: "Malaysia", percentage: 36}, {name: "Singapore", percentage: 25}, {name: "US", percentage: 20}, {name: "UK", percentage: 11}, {name: "Australia", percentage: 8}] },
                    { id: 3, content: "Day in the Life @ Cytron Lab", type: "Video", date: "2026-07-05", views: 950000, likes: 82100, reach: 320000, countries: [{name: "Singapore", percentage: 60}, {name: "Malaysia", percentage: 18}, {name: "US", percentage: 12}, {name: "UK", percentage: 6}, {name: "Australia", percentage: 4}] },
                    { id: 4, content: "Soldering Tips for Beginners", type: "Video", date: "2026-06-28", views: 720000, likes: 64500, reach: 240000, countries: [{name: "Malaysia", percentage: 35}, {name: "Singapore", percentage: 20}, {name: "UK", percentage: 20}, {name: "US", percentage: 15}, {name: "Australia", percentage: 10}] },
                    { id: 5, content: "Pico vs Arduino: Speed Test", type: "Video", date: "2026-06-20", views: 680000, likes: 60400, reach: 230000, countries: [{name: "Malaysia", percentage: 30}, {name: "Singapore", percentage: 25}, {name: "UK", percentage: 20}, {name: "US", percentage: 15}, {name: "Australia", percentage: 10}] }
                ],
                totalReach: 680800,
                followers: 210000
            },
            facebook: {
                posts: [
                    { id: 1, content: "Educator Workshop: Robotics in Classrooms", type: "Event", date: "2026-07-12", views: 520000, likes: 45600, reach: 223200, countries: [{name: "Singapore", percentage: 50}, {name: "Malaysia", percentage: 20}, {name: "US", percentage: 15}, {name: "UK", percentage: 8}, {name: "Australia", percentage: 7}] },
                    { id: 2, content: "Customer Project: Smart Farm", type: "Photo", date: "2026-07-08", views: 430000, likes: 38200, reach: 190000, countries: [{name: "Malaysia", percentage: 32}, {name: "Singapore", percentage: 30}, {name: "US", percentage: 18}, {name: "UK", percentage: 12}, {name: "Australia", percentage: 8}] },
                    { id: 3, content: "Free Shipping Week Promotion", type: "Post", date: "2026-07-01", views: 380000, likes: 32800, reach: 160000, countries: [{name: "Singapore", percentage: 40}, {name: "Malaysia", percentage: 30}, {name: "US", percentage: 15}, {name: "UK", percentage: 8}, {name: "Australia", percentage: 7}] },
                    { id: 4, content: "Raspberry Pi Pico W Launch Alert", type: "Link", date: "2026-06-24", views: 310000, likes: 29100, reach: 140000, countries: [{name: "Malaysia", percentage: 35}, {name: "Singapore", percentage: 30}, {name: "US", percentage: 20}, {name: "UK", percentage: 10}, {name: "Australia", percentage: 5}] },
                    { id: 5, content: "Community Spotlight: NUS Maker Club", type: "Photo", date: "2026-06-17", views: 270000, likes: 24500, reach: 120000, countries: [{name: "Singapore", percentage: 65}, {name: "Malaysia", percentage: 12}, {name: "US", percentage: 10}, {name: "UK", percentage: 7}, {name: "Australia", percentage: 6}] }
                ],
                totalReach: 223200,
                followers: 85000
            }
        };
        return mockData[platform];
    }

    // ── Load and display dashboard data ──
    async function loadDashboardData() {
        try {
            // Fetch data for all platforms
            const [instagramData, tiktokData, facebookData] = await Promise.all([
                fetchSocialData('instagram'),
                fetchSocialData('tiktok'),
                fetchSocialData('facebook')
            ]);

            // Update KPI cards
            updateKPIs(instagramData, tiktokData, facebookData);

            // Update platform tables
            updatePlatformTable('instagram', instagramData);
            updatePlatformTable('tiktok', tiktokData);
            updatePlatformTable('facebook', facebookData);

        } catch (error) {
            console.error('Error loading dashboard data:', error);
            // Fallback to mock data on error
            updateKPIs(getMockData('instagram'), getMockData('tiktok'), getMockData('facebook'));
            updatePlatformTable('instagram', getMockData('instagram'));
            updatePlatformTable('tiktok', getMockData('tiktok'));
            updatePlatformTable('facebook', getMockData('facebook'));
        }
    }

    // ── Update KPI cards with real data ──
    function updateKPIs(instagramData, tiktokData, facebookData) {
        const totalReach = instagramData.totalReach + tiktokData.totalReach + facebookData.totalReach;
        const totalLikes = instagramData.posts.reduce((sum, post) => sum + post.likes, 0) +
                          tiktokData.posts.reduce((sum, post) => sum + post.likes, 0) +
                          facebookData.posts.reduce((sum, post) => sum + post.likes, 0);
        const totalViews = instagramData.posts.reduce((sum, post) => sum + post.views, 0) +
                          tiktokData.posts.reduce((sum, post) => sum + post.views, 0) +
                          facebookData.posts.reduce((sum, post) => sum + post.views, 0);
        const totalFollowers = instagramData.followers + tiktokData.followers + facebookData.followers;
        const engagementRate = ((totalLikes / totalViews) * 100).toFixed(1);
        const totalPosts = instagramData.posts.length + tiktokData.posts.length + facebookData.posts.length;

        document.getElementById('total-reach').textContent = formatNumber(totalReach);
        document.getElementById('engagement-rate').textContent = engagementRate + '%';
        document.getElementById('total-followers').textContent = formatNumber(totalFollowers);
        document.getElementById('content-published').textContent = totalPosts;

        // Update platform-specific reach
        document.getElementById('instagram-reach').textContent = formatNumber(instagramData.totalReach) + ' reach';
        document.getElementById('tiktok-reach').textContent = formatNumber(tiktokData.totalReach) + ' reach';
        document.getElementById('facebook-reach').textContent = formatNumber(facebookData.totalReach) + ' reach';
    }

    // ── Update platform table with real data ──
    function updatePlatformTable(platform, data) {
        const tbody = document.getElementById(`${platform}-table-body`);
        if (!tbody) return;

        tbody.innerHTML = '';

        data.posts.forEach((post, index) => {
            const row = document.createElement('tr');
            row.className = 'preview-row';
            
            row.innerHTML = `
                <td><span class="rank-badge rank-${index + 1}">${index + 1}</span></td>
                <td>
                    <div class="content-name">${post.content}</div>
                    <div class="content-meta"><span class="type-badge type-${post.type.toLowerCase()}">${post.type}</span> · ${post.date}</div>
                </td>
                <td class="cell-num">${formatNumber(post.views)}</td>
                <td class="cell-num">${formatNumber(post.likes)}</td>
                <td class="cell-num">${formatNumber(post.reach)}</td>
                <td class="country-col">
                    ${generateCountryBar(post.countries)}
                </td>
            `;
            
            tbody.appendChild(row);
        });
    }

    // ── localStorage for Content Schedule ──
    const STORAGE_KEY = 'cytron_content_schedule';

    function saveContentSchedule() {
        const rows = document.querySelectorAll('#contentScheduleBody tr');
        const data = [];
        
        rows.forEach(row => {
            const platform = row.dataset.platform;
            const date = row.querySelector('.schedule-date').textContent;
            const day = row.querySelector('.schedule-day').textContent;
            const content = row.querySelector('.content-name').textContent.trim();
            const format = row.querySelector('.type-badge').textContent.trim();
            const goal = row.cells[4].textContent.trim();
            const status = row.querySelector('.status-select').value;
            
            data.push({ platform, date, day, content, format, goal, status });
        });
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    function loadContentSchedule() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return;

        try {
            const data = JSON.parse(saved);
            const tbody = document.getElementById('contentScheduleBody');
            tbody.innerHTML = '';

            data.forEach(item => {
                const row = document.createElement('tr');
                row.dataset.platform = item.platform;
                
                const platformMap = {
                    instagram: { color: '#e1306c', icon: 'fa-brands fa-instagram', label: 'Instagram' },
                    tiktok: { color: '#010101', icon: 'fa-brands fa-tiktok', label: 'TikTok' },
                    facebook: { color: '#1877f2', icon: 'fa-brands fa-facebook', label: 'Facebook' }
                };
                const platformInfo = platformMap[item.platform] || platformMap.instagram;

                const formatClassMap = {
                    'Reel': 'type-reel',
                    'Video': 'type-video',
                    'Carousel': 'type-carousel',
                    'Photo': 'type-photo',
                    'Post': 'type-post',
                    'Event': 'type-event',
                    'Link': 'type-link'
                };
                const formatClass = formatClassMap[item.format] || 'type-post';

                const statusClasses = {
                    'Draft': 'draft',
                    'Approved': 'approved',
                    'In Production': 'production',
                    'Scheduled': 'scheduled',
                    'Published': 'published'
                };
                const statusClass = statusClasses[item.status] || 'draft';

                row.innerHTML = `
                    <td><span class="schedule-date">${item.date}</span><div class="schedule-day">${item.day}</div></td>
                    <td><span class="idea-platform" style="color:${platformInfo.color};"><i class="${platformInfo.icon}"></i> ${platformInfo.label}</span></td>
                    <td class="content-name" style="max-width:300px;">${item.content}</td>
                    <td><span class="type-badge ${formatClass}">${item.format}</span></td>
                    <td>${item.goal}</td>
                    <td>
                        <select class="status-select ${statusClass}">
                            <option value="Draft" ${item.status === 'Draft' ? 'selected' : ''}>Draft</option>
                            <option value="Approved" ${item.status === 'Approved' ? 'selected' : ''}>Approved</option>
                            <option value="In Production" ${item.status === 'In Production' ? 'selected' : ''}>In Production</option>
                            <option value="Scheduled" ${item.status === 'Scheduled' ? 'selected' : ''}>Scheduled</option>
                            <option value="Published" ${item.status === 'Published' ? 'selected' : ''}>Published</option>
                        </select>
                    </td>
                    <td class="cell-actions">
                        <button class="btn-icon btn-edit" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="btn-icon btn-delete" title="Delete"><i class="fa-solid fa-trash-can"></i></button>
                    </td>
                `;

                const newSelect = row.querySelector('.status-select');
                newSelect.addEventListener('change', saveContentSchedule);

                tbody.appendChild(row);
            });
        } catch (error) {
            console.error('Error loading content schedule:', error);
        }
    }

    // ── Save content on changes ──
    document.getElementById('contentScheduleBody').addEventListener('change', saveContentSchedule);

    // ── Chart.js: Content Performance Trend ──
    const trendCtx = document.getElementById('trendChart').getContext('2d');
    new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Instagram',
                    data: [312000, 320000, 335000, 348000, 362000, 375000, 380500],
                    borderColor: '#e1306c',
                    backgroundColor: 'rgba(225,48,108,0.04)',
                    tension: 0.35,
                    borderWidth: 3,
                    pointBackgroundColor: '#e1306c',
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    fill: false
                },
                {
                    label: 'TikTok',
                    data: [420000, 465000, 510000, 560000, 610000, 645000, 680800],
                    borderColor: '#010101',
                    backgroundColor: 'rgba(0,0,0,0.04)',
                    tension: 0.35,
                    borderWidth: 3,
                    pointBackgroundColor: '#010101',
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    fill: false
                },
                {
                    label: 'Facebook',
                    data: [180000, 190000, 195000, 205000, 215000, 220000, 223200],
                    borderColor: '#1877f2',
                    backgroundColor: 'rgba(24,119,242,0.04)',
                    tension: 0.35,
                    borderWidth: 3,
                    pointBackgroundColor: '#1877f2',
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        boxWidth: 24,
                        padding: 14,
                        font: { size: '16', weight: '450' }
                    }
                },
                tooltip: {
                    backgroundColor: '#1A1A2E',
                    padding: 12,
                    cornerRadius: 10,
                    titleFont: { weight: '700' },
                    callbacks: {
                        label: function(ctx) {
                            let value = ctx.parsed.y;
                            if (value >= 1000000) return ' ' + ctx.dataset.label + ': ' + (value / 1000000).toFixed(2) + 'M';
                            if (value >= 1000) return ' ' + ctx.dataset.label + ': ' + (value / 1000).toFixed(1) + 'K';
                            return ' ' + ctx.dataset.label + ': ' + value;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1400000,
                    grid: { color: '#E8F0FE' },
                    border: { display: false },
                    ticks: {
                        stepSize: 200000,
                        callback: function(value) {
                            if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
                            if (value >= 1000) return (value / 1000).toFixed(0) + 'K';
                            return value;
                        },
                        font: { size: 11, weight: '500' },
                        color: '#5a6b8c',
                        padding: 6
                    }
                },
                x: {
                    grid: { display: false },
                    border: { display: false },
                    ticks: { font: { size: 12, weight: '600' }, color: '#1A1A2E' }
                }
            }
        }
    });

    // ── Status Select Color Change ──
    const statusClasses = {
        'Draft': 'draft',
        'Approved': 'approved',
        'In Production': 'production',
        'Scheduled': 'scheduled',
        'Published': 'published'
    };

    function refreshStatusClass(select) {
        select.className = 'status-select ' + (statusClasses[select.value] || 'draft');
    }

    document.querySelectorAll('.status-select').forEach(select => {
        select.addEventListener('change', function() { refreshStatusClass(this); });
    });

    // ── Add New Content form ──
    const addContentBtn = document.getElementById('addContentBtn');
    const addContentForm = document.getElementById('addContentForm');
    const cancelContentBtn = document.getElementById('cancelContentBtn');

    addContentBtn.addEventListener('click', () => {
        addContentForm.style.display = addContentForm.style.display === 'none' ? 'block' : 'none';
    });
    cancelContentBtn.addEventListener('click', () => {
        addContentForm.style.display = 'none';
    });

    // ── Save content button ──
    document.getElementById('saveContentBtn').addEventListener('click', function() {
        const date = document.getElementById('newContentDate').value || '2026-08-18';
        const platform = document.getElementById('newContentPlatform').value;
        const title = document.getElementById('newContentTitle').value.trim();
        const format = document.getElementById('newContentFormat').value;
        const goal = document.getElementById('newContentGoal').value.trim();
        const status = document.getElementById('newContentStatus').value;

        if (!title) { alert('Please enter a content idea'); return; }

        // Check if we're editing an existing row
        if (this.dataset.editingRow) {
            addRowToTable({ date, platform, title, format, goal, status });
            delete this.dataset.editingRow;
            this.innerHTML = '<i class="fa-solid fa-check"></i> Add Content';
        } else {
            addRowToTable({ date, platform, title, format, goal, status });
        }

        addContentForm.style.display = 'none';
        document.getElementById('newContentTitle').value = '';
        document.getElementById('newContentGoal').value = '';
        
        saveContentSchedule();
    });

    // ── Suggest Ideas button ──
    document.getElementById('suggestIdeasBtn').addEventListener('click', function() {
        const ideas = [
            { date: '2026-08-25', platform: 'instagram', title: '5 Fun Robotics Projects for Beginners', format: 'Carousel', goal: 'Educator outreach', status: 'Draft' },
            { date: '2026-08-26', platform: 'tiktok', title: 'RGB LED Cube: 10 Seconds of Pure Code', format: 'Video', goal: 'Increase engagement', status: 'Draft' },
            { date: '2026-08-27', platform: 'facebook', title: 'Live Q&A: Choosing Your First Microcontroller', format: 'Event', goal: 'Community building', status: 'Draft' }
        ];
        ideas.forEach(idea => addRowToTable(idea));
        saveContentSchedule();
    });

    // ── Filter buttons ──
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;
            document.querySelectorAll('#contentScheduleBody tr').forEach(row => {
                if (filter === 'all' || row.dataset.platform === filter) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });

    // ── Helper: add a new row to the schedule table ──
    function addRowToTable(data) {
        const tbody = document.getElementById('contentScheduleBody');
        const tr = document.createElement('tr');
        tr.dataset.platform = data.platform;

        const platformMap = {
            instagram: { color: '#e1306c', icon: 'fa-brands fa-instagram', label: 'Instagram' },
            tiktok: { color: '#010101', icon: 'fa-brands fa-tiktok', label: 'TikTok' },
            facebook: { color: '#1877f2', icon: 'fa-brands fa-facebook', label: 'Facebook' }
        };
        const platformInfo = platformMap[data.platform] || platformMap.instagram;

        const formatClassMap = {
            'Reel': 'type-reel',
            'Video': 'type-video',
            'Carousel': 'type-carousel',
            'Photo': 'type-photo',
            'Post': 'type-post',
            'Event': 'type-event',
            'Link': 'type-link'
        };
        const formatClass = formatClassMap[data.format] || 'type-post';

        const statusOptions = ['Draft', 'Approved', 'In Production', 'Scheduled', 'Published'];
        const statusClass = statusClasses[data.status] || 'draft';

        // Format date
        const dateObj = new Date(data.date);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const dayName = days[dateObj.getDay()];
        const dayNum = dateObj.getDate().toString().padStart(2, '0');
        const monthName = months[dateObj.getMonth()];
        const year = dateObj.getFullYear();
        const formattedDate = `${dayName}, ${dayNum} ${monthName} ${year}`;

        tr.innerHTML = `
            <td><span class="schedule-date">${formattedDate}</span><div class="schedule-day">${dayName}</div></td>
            <td><span class="idea-platform" style="color:${platformInfo.color};"><i class="${platformInfo.icon}"></i> ${platformInfo.label}</span></td>
            <td class="content-name" style="max-width:300px;">${data.title}</td>
            <td><span class="type-badge ${formatClass}">${data.format}</span></td>
            <td>${data.goal}</td>
            <td>
                <select class="status-select ${statusClass}">
                    ${statusOptions.map(opt => `<option value="${opt}" ${opt === data.status ? 'selected' : ''}>${opt}</option>`).join('')}
                </select>
            </td>
            <td class="cell-actions">
                <button class="btn-icon btn-edit" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="btn-icon btn-delete" title="Delete"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        `;

        const newSelect = tr.querySelector('.status-select');
        newSelect.addEventListener('change', saveContentSchedule);

        tbody.appendChild(tr);
    }

    // ── Edit & Delete row actions (event delegation) ──
    const scheduleBody = document.getElementById('contentScheduleBody');

    scheduleBody.addEventListener('click', function(e) {

        // ── DELETE ──
        const deleteBtn = e.target.closest('.btn-delete');
        if (deleteBtn) {
            if (confirm('Delete this content item?')) {
                const row = deleteBtn.closest('tr');
                row.remove();
                saveContentSchedule();
            }
            return;
        }

        // ── EDIT ──
        const editBtn = e.target.closest('.btn-edit');
        if (editBtn) {
            const row = editBtn.closest('tr');
            const cells = row.querySelectorAll('td');

            const dateText   = cells[0].querySelector('.schedule-date')?.textContent || '';
            const platform   = row.dataset.platform;
            const title      = cells[2].textContent.trim();
            const formatEl   = cells[3].querySelector('.type-badge');
            const format     = formatEl ? formatEl.textContent.trim() : 'Post';
            const goal       = cells[4].textContent.trim();
            const statusSelect = cells[5].querySelector('.status-select');
            const status     = statusSelect ? statusSelect.value : 'Draft';

            // Parse the date from format "Day, DD Mon YYYY"
            const dateMatch = dateText.match(/^([A-Za-z]{3}),\s+(\d{2})\s+([A-Za-z]{3})\s+(\d{4})$/);
            if (dateMatch) {
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const monthIndex = months.indexOf(dateMatch[3]);
                if (monthIndex !== -1) {
                    const dateForInput = `${dateMatch[4]}-${(monthIndex + 1).toString().padStart(2, '0')}-${dateMatch[2]}`;
                    document.getElementById('newContentDate').value = dateForInput;
                }
            }

            document.getElementById('newContentPlatform').value = platform;
            document.getElementById('newContentTitle').value    = title;
            document.getElementById('newContentFormat').value   = format;
            document.getElementById('newContentGoal').value     = goal;
            document.getElementById('newContentStatus').value   = status;

            document.getElementById('addContentForm').style.display = 'block';
            row.remove();

            const saveBtn = document.getElementById('saveContentBtn');
            saveBtn.dataset.editingRow = 'true';
            saveBtn.innerHTML = '<i class="fa-solid fa-check"></i> Update Content';

            document.getElementById('addContentForm').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    // ── View More / Back Functionality ──
    const tablesGrid = document.getElementById('tablesGrid');
    const overlay = document.getElementById('tableOverlay');
    const platformCards = document.querySelectorAll('.platform-card');

    // Track which card is expanded
    let expandedCard = null;

    // View More buttons
    document.querySelectorAll('.view-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.dataset.platform;
            const card = document.querySelector(`.platform-card[data-platform="${platform}"]`);
            
            if (!card || card === expandedCard) return;
            
            // Close any currently expanded card
            if (expandedCard) {
                closeExpandedCard(expandedCard);
            }
            
            // Expand this card
            expandCard(card);
        });
    });

    // Back buttons
    document.querySelectorAll('.back-btn').forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.dataset.platform;
            const card = document.querySelector(`.platform-card[data-platform="${platform}"]`);
            if (card) {
                closeExpandedCard(card);
            }
        });
    });

    // Close on overlay click
    overlay.addEventListener('click', function() {
        if (expandedCard) {
            closeExpandedCard(expandedCard);
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && expandedCard) {
            closeExpandedCard(expandedCard);
        }
    });

    function expandCard(card) {
        expandedCard = card;
        
        // Hide other cards
        platformCards.forEach(c => {
            if (c !== card) {
                c.style.display = 'none';
            }
        });
        
        // Show overlay
        overlay.classList.add('active');
        
        // Expand the card
        card.classList.add('expanded');
        
        // Scroll to top of expanded card
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    function closeExpandedCard(card) {
        if (!card) return;
        
        // Show all cards again
        platformCards.forEach(c => {
            c.style.display = '';
        });
        
        // Hide overlay
        overlay.classList.remove('active');
        
        // Collapse the card
        card.classList.remove('expanded');
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        expandedCard = null;
    }

    // ── Initialize: Load saved content and dashboard data ──
    loadContentSchedule();
    loadDashboardData();
});