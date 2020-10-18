import React from 'react';
import Credits from './Credits'

export default function StoryList({ stories }) {
    return (
        <div className='story-item'>
            <ul>
                {stories && stories.map((story) => (
                    <li key={story.id}>
                        <a href={story.url}>{story.title}</a><br />
                        <Credits story={story} />
                    </li>
                ))}
            </ul>
        </div>
    )
}