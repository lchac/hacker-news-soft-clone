import React from 'react';
import Credits from './Credits'

export default function StoryList({ stories }) {
    return (
        <ul>
            {stories && stories.map((story) => (
                <li key={story.id}>
                    <div className='story-item'>
                        <a className='story-link' href={story.url}>{story.title}</a><br />
                        <Credits story={story} />
                    </div>
                </li>
            ))}
        </ul>
    )
}