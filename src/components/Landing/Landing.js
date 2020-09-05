import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import images from '../../ImgAssets/index';
import s from './Landing.module.css';

export default function LandingPage(props) {
  return (
    <section className={s.landing}>
      <div className={s.heroWrapper}>
        <div className={s.hero}>
          <header>
            <h1 className='bounce'>Chore Runner</h1>
            <p>
              The <em>Smart</em> Shared To-Do List
            </p>
          </header>

          <div className={s.linkButtons}>
            <Link className='arcadeButton' tabIndex={1} to='/kidLogin'>
              I am a kid
            </Link>
            <Link className='arcadeButton' tabIndex={2} to='/login'>
              I am a parent
            </Link>
            <Link className='arcadeButton' tabIndex={3} to='/register'>
              I am new
            </Link>
          </div>
          <div className={s.about}>
            <a href={'#about-info'}>
              How does it work?
              <FontAwesomeIcon
                className='down-arrow'
                icon={faCaretDown}
                size='5x'
                color='white'
              />
            </a>
          </div>
        </div>
      </div>

      <section className={s.onBoarding}>
        <header>
          <h3>For Kids!</h3>
        </header>
        <div className={s.kidImage}>
          <img src={images.kidScreen} alt='Badge' />
        </div>
        <div className={s.onBoardingContent}>
          <h4>Complete challenges, get badges!</h4>
          <p>
            Chores are boring, games are fun! The rules are simple: race your
            family members to complete chore-lenges, earn points, and get
            badges. However, you can only earn points after your parents have
            approved your chores.
          </p>

          <p>
            Can you collect all 10 badges and become the top chorerunner in your
            house? Ask your parents to help you sign up today!
          </p>

          <Link
            className='arcadeButton'
            tabIndex={4}
            style={{ textDecoration: 'none' }}
            to='/kidLogin'
          >
            I am a kid
          </Link>
        </div>

        <header>
          <h3>For Parents!</h3>
        </header>
        <div className={s.parentImage}>
          <img src={images.parentScreen} alt='parent dashboard' />
        </div>
        <div className={s.onBoardingContent}>
          <h4>Make chores easy and fun!</h4>
          <p>
            "Who's turn is it to do the dishes? Didn't you ask them to finish
            this two days ago?""
          </p>
          <p>
            Sound familiar? We know that managing and delegating household
            chores can be a struggle. Let Chorerunner help!
          </p>
          <p>
            Chorerunner makes chores a fun competition between kids and family
            members. Simply sign up, add household members, assign tasks, and
            let chorerunner do the rest. As members complete tasks, they move up
            the household leaderboard, gain levels, and earn badges.
          </p>
          <p>
            Spend less time working and more time playing. Sign in or sign up to
            get started!
          </p>
          <Link
            className='arcadeButton'
            tabIndex={2}
            style={{ textDecoration: 'none' }}
            to='/login'
          >
            I am a parent
          </Link>
          <Link
            className='arcadeButton'
            tabIndex={3}
            style={{ textDecoration: 'none' }}
            to='/register'
          >
            I am new
          </Link>
        </div>
      </section>
    </section>
  );
}
