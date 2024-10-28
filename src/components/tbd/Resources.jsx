const Resources = () => {
    const resources = [
        { id: 1, title: 'Meditation Tips', link: '#' },
        { id: 2, title: 'Breathing Exercises', link: '#' },
        { id: 3, title: 'Managing Anxiety', link: '#' },
    ];

    return (
        <div>
            <h2>Mental Health Resources</h2>
            <ul>
                {resources.map((resource) => (
                    <li key={resource.id}>
                        <a href={resource.link}>{resource.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Resources;
