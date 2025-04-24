document.addEventListener('DOMContentLoaded', () => {
    const tooltip = document.getElementById('tooltip');
    const hoverWords = document.querySelectorAll('.hover-word');

    hoverWords.forEach(word => {
        word.addEventListener('mouseenter', (e) => {
            const info = word.getAttribute('data-info');
            if (!info) return;

            // Get element position
            const rect = word.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Show tooltip
            tooltip.textContent = info;
            tooltip.style.display = 'block';
            tooltip.style.opacity = '0';  // Start invisible for measurement

            // Calculate initial position (prefer above)
            let tooltipY = rect.top + scrollTop - tooltip.offsetHeight - 15;
            let tooltipX = rect.left + (rect.width/2) - (tooltip.offsetWidth/2);

            // Check if tooltip would go above viewport
            if (tooltipY < scrollTop + 10) {
                // Position below element
                tooltipY = rect.bottom + scrollTop + 15;
                tooltip.classList.add('tooltip-below');
            } else {
                tooltip.classList.remove('tooltip-below');
            }

            // Ensure horizontal position stays within viewport
            const minX = 10;
            const maxX = window.innerWidth - tooltip.offsetWidth - 10;
            tooltipX = Math.max(minX, Math.min(tooltipX, maxX));

            // Apply position and fade in
            tooltip.style.left = `${tooltipX}px`;
            tooltip.style.top = `${tooltipY}px`;
            requestAnimationFrame(() => {
                tooltip.style.opacity = '1';
            });
        });

        word.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            setTimeout(() => {
                if (tooltip.style.opacity === '0') {
                    tooltip.style.display = 'none';
                }
            }, 200);
        });
    });
});
