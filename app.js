<script>
    function showMap(location) {
        const iframe = document.getElementById('googleMap');
        const apiKey = 'TU_API_KEY'; // Reemplaza con tu clave de Google Maps API
        iframe.src = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(location)}`;
    }
</script>