<script lang="ts">
  import type { CVData } from '../types';
  export let cvData: CVData;

  const skills = cvData.skills.split(',').map(s => s.trim()).filter(s => s);

  function formatDate(dateStr: string): string {
    if (!dateStr) return 'Present';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }
</script>

<div class="cv-template creative">
  <div class="left-column">
    {#if cvData.photoUrl}
      <div class="photo">
        <img src={cvData.photoUrl} alt={cvData.fullName} />
      </div>
    {/if}
    <h1 class="name">{cvData.fullName || 'Your Name'}</h1>
    <div class="contact-info">
      <div class="contact-item">{cvData.email || 'email@example.com'}</div>
      <div class="contact-item">{cvData.phone || '+1 (555) 123-4567'}</div>
      <div class="contact-item">{cvData.location || 'City, State'}</div>
    </div>

    {#if skills.length > 0}
      <section class="section">
        <h2 class="section-title">Skills</h2>
        <div class="skills-list">
          {#each skills as skill}
            <span class="skill-tag">{skill}</span>
          {/each}
        </div>
      </section>
    {/if}

    {#if cvData.education.length > 0}
      <section class="section">
        <h2 class="section-title">Education</h2>
        {#each cvData.education as edu}
          <div class="entry">
            <h3 class="degree">{edu.degree || 'Degree'}</h3>
            <div class="institution">{edu.institution || 'Institution'}</div>
            <div class="year">{edu.year}</div>
          </div>
        {/each}
      </section>
    {/if}
  </div>

  <div class="right-column">
    {#if cvData.summary}
      <section class="section summary">
        <p>{cvData.summary}</p>
      </section>
    {/if}

    <section class="section">
      <h2 class="section-title">Experience</h2>
      {#each cvData.experience as exp}
        <div class="entry">
          <div class="date">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</div>
          <h3 class="job-title">{exp.jobTitle || 'Job Title'}</h3>
          <div class="company">{exp.company || 'Company Name'}</div>
          <p class="description">{exp.description}</p>
        </div>
      {/each}
    </section>

    {#if cvData.projects.length > 0}
      <section class="section">
        <h2 class="section-title">Projects</h2>
        {#each cvData.projects as proj}
          <div class="entry">
            <h3 class="project-name">{proj.name}</h3>
            {#if proj.url}<a href={proj.url} target="_blank">{proj.url}</a>{/if}
            <p class="description">{proj.description}</p>
          </div>
        {/each}
      </section>
    {/if}

    {#if cvData.certificates.length > 0}
      <section class="section">
        <h2 class="section-title">Certificates</h2>
        {#each cvData.certificates as cert}
          <div class="cert-entry">{cert.name} - {cert.issuer} ({cert.year})</div>
        {/each}
      </section>
    {/if}
  </div>
</div>

<style>
  .cv-template.creative {
    display: flex;
    font-family: 'Montserrat', sans-serif;
    background: #f8f9fa;
    font-size: 10pt;
  }

  .left-column {
    width: 38%;
    background: #343a40;
    color: #f8f9fa;
    padding: 2.5rem;
    text-align: center;
  }

  .photo {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 1.5rem;
    border: 4px solid #fca311;
  }

  .photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .name {
    font-size: 22pt;
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  .contact-info {
    margin-bottom: 2rem;
    font-size: 9pt;
    line-height: 1.6;
  }

  .section {
    margin-bottom: 2rem;
    text-align: left;
  }

  .left-column .section-title {
    color: #fca311;
    font-size: 13pt;
    font-weight: 600;
    margin-bottom: 0.8rem;
    text-align: center;
  }

  .skills-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }

  .skill-tag {
    background: #495057;
    padding: 0.4rem 0.8rem;
    border-radius: 1rem;
    font-size: 9pt;
  }

  .entry {
    margin-bottom: 1rem;
  }

  .degree {
    font-size: 10pt;
    font-weight: 600;
  }

  .institution, .year {
    font-size: 9pt;
    color: #ced4da;
  }

  .right-column {
    width: 62%;
    padding: 2.5rem;
    color: #343a40;
  }

  .summary {
    background: #e9ecef;
    padding: 1rem;
    border-radius: 0.5rem;
    font-style: italic;
  }

  .right-column .section-title {
    font-size: 14pt;
    font-weight: 700;
    color: #343a40;
    border-bottom: 3px solid #fca311;
    padding-bottom: 0.3rem;
    margin-bottom: 1rem;
  }

  .right-column .entry {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .right-column .entry::before {
    content: '';
    position: absolute;
    left: 0;
    top: 5px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #fca311;
  }

  .date {
    font-size: 9pt;
    font-weight: 600;
    color: #495057;
    margin-bottom: 0.2rem;
  }

  .job-title, .project-name {
    font-size: 12pt;
    font-weight: 600;
  }

  .company {
    font-size: 10pt;
    font-style: italic;
    margin-bottom: 0.3rem;
  }

  .description {
    font-size: 9.5pt;
  }

  .cert-entry {
    font-size: 10pt;
  }
</style>
